import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import BottomTabBar from "../../components/BottomTabBar";
import MenuButton from "../../components/MenuButton";
import ProfileHeader from "../../components/ProfileHeader";
import RPGBorder from "../../components/RPGBorder";
import PasswordRequirement from '../../components/PasswordRequirement';

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#ffff"
};

export default function ChangePassword({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Home');
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


// Validações de senha
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!isPasswordValid) {
      setError("A senha não atende aos requisitos mínimos.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 2000);
  };



  // Dados do usuário (normalmente viriam de um contexto/API)
   const [userData, setUserData] = useState({
      name: "Tio do Claudio",
      email: "email@email.com",
      avatar: null,
      coins: 150,
    });

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Home");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };
  
const [cardName, setCardName] = useState('');
  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Troca de Senha" 
      />

      <View style={styles.content}>
        
{/* Header com Avatar e Informações */}
        <ProfileHeader
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          coins={userData.coins}
          borderType="blue"
          centerColor={COLORS.secondary}
        />


        {/* Texto */}
        <Text style={styles.Text}>
        Digite sua senha atual, a nova senha e, em seguida, digite a nova senha mais uma viz para confirmá-la
        </Text>


        {/* Senha Atual */}
        <View style={styles.inputWrapper}>
          <RPGBorder 
            width={345} 
            height={50} 
            tileSize={8} 
            centerColor={COLORS.white}
            borderType="white"
            >
          <TextInput
            style={styles.input}
            placeholder="Senha Atual"
            placeholderTextColor="#000000ff"
            value={cardName}
            onChangeText={setCardName}
            />
          </RPGBorder>
        </View>

        {/* Senha Nova  */}
        <View style={styles.inputWrapper}>
          <RPGBorder 
           width={345} 
           height={50} 
           tileSize={8} 
           centerColor={COLORS.white}
           borderType="white"
          >
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#000000ff"
            value={cardName}
            onChangeText={setCardName}
          />
          </RPGBorder>
        </View>

        {/* Confirmar Senha Nova  */}
        <View style={styles.inputWrapper}>
          <RPGBorder 
           width={345} 
           height={50} 
           tileSize={8} 
           centerColor={COLORS.white}
           borderType="white"
          >
          <TextInput
            style={styles.input}
            placeholder="Confirme a Senha"
            placeholderTextColor="#000000ff"
            value={cardName}
            onChangeText={setCardName}
          />
          </RPGBorder>
        </View>

<View style={styles.requirementsContainer}>
              <PasswordRequirement 
                text="Mínimo de 8 caracteres" 
                isValid={hasMinLength} 
              />
              <PasswordRequirement 
                text="Pelo menos 1 letra maiúscula" 
                isValid={hasUpperCase} 
              />
              <PasswordRequirement 
                text="Pelo menos 1 letra minúscula" 
                isValid={hasLowerCase} 
              />
              <PasswordRequirement 
                text="Pelo menos 1 número" 
                isValid={hasNumber} 
              />
              <PasswordRequirement 
                text="Pelo menos 1 caractere especial" 
                isValid={hasSpecialChar} 
              />
            </View>






{/* Botão Continue*/}
        <View style={styles.buttonContainer}>
          <MenuButton
            title="Continue"
            onPress={() => navigation.navigate('ProductList')}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        </View>


      </View>


      

      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  Text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    color: "#000000ff",
    fontSize: 16,
    fontFamily: "VT323",
    paddingHorizontal: 12,
    textAlign: 'center',
    paddingVertical: 0,
  },
  inputWrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  requirementsContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 5,
  },
});