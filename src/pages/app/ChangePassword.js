import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
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
  white: "#FFFFFF"
};

export default function ChangePassword({ navigation }) {
  const fontLoaded = useFontLoader();
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Refs para as posições dos campos
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Validações de senha
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

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

  const handleContinue = () => {
    if (!currentPassword || !password || !confirmPassword) {
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
    // Aqui você faria a chamada à API para alterar a senha
    console.log("Senha alterada com sucesso!");
    navigation.goBack();
  };

  const handleFieldFocus = (ref) => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({
            y: pageY - 100,
            animated: true,
          });
        });
      }, 300);
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Troca de Senha" 
      />

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header com Avatar e Informações */}
        <ProfileHeader
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          coins={userData.coins}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Texto Explicativo */}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>
            Digite sua senha atual, a nova senha e, em seguida, digite a nova senha mais uma vez para confirmá-la.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Senha Atual */}
          <View 
            ref={currentPasswordRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Senha Atual</Text>
            <RPGBorder 
              width={345} 
              height={50} 
              tileSize={8} 
              centerColor={COLORS.white}
              borderType="white"
            >
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#999999"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                onFocus={() => handleFieldFocus(currentPasswordRef)}
                secureTextEntry
              />
            </RPGBorder>
          </View>

          {/* Nova Senha */}
          <View 
            ref={newPasswordRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Nova Senha</Text>
            <RPGBorder 
              width={345} 
              height={50} 
              tileSize={8} 
              centerColor={COLORS.white}
              borderType="white"
            >
              <TextInput
                style={styles.input}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleFieldFocus(newPasswordRef)}
                secureTextEntry
              />
            </RPGBorder>
          </View>

          {/* Confirmar Nova Senha */}
          <View 
            ref={confirmPasswordRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
            <RPGBorder 
              width={345} 
              height={50} 
              tileSize={8} 
              centerColor={COLORS.white}
              borderType="white"
            >
              <TextInput
                style={styles.input}
                placeholder="Confirme sua nova senha"
                placeholderTextColor="#999999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => handleFieldFocus(confirmPasswordRef)}
                secureTextEntry
              />
            </RPGBorder>
          </View>

          {/* Requisitos da Senha */}
          {password.length > 0 && (
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
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
          )}

          {/* Mensagem de Erro */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <MenuButton
            title="Salvar Alterações"
            onPress={handleContinue}
            borderType="blue"
            centerColor="#1F41BB"
          />
        </View>
      </ScrollView>

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
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 16,
  },
  descriptionWrapper: {
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  descriptionText: {
    color: "#CCCCCC",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    alignSelf: 'flex-start',
    paddingLeft: 24,
    marginBottom: 6,
  },
  input: {
    flex: 1,
    color: "#000000",
    fontSize: 16,
    fontFamily: "VT323",
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
  requirementsContainer: {
    width: 345,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  requirementsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 8,
  },
  errorText: {
    color: "#FF4444",
    fontSize: 16,
    fontFamily: "VT323",
    marginTop: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
});