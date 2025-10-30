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

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#FFFFFF"
};

export default function PersonalData({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Home');
  const [error, setError] = useState("");

  // Dados do usuário (normalmente viriam de um contexto/API)
  const [userData, setUserData] = useState({
    name: "Tio do Claudio",
    email: "email@email.com",
    avatar: null,
    coins: 150,
  });

  const [fullName, setFullName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Home");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleSave = () => {
    // Validações
    if (!fullName.trim() || !email.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Validação de nome (mínimo 3 caracteres, sem números)
    if (fullName.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    if (/\d/.test(fullName)) {
      setError("O nome não deve conter números.");
      return;
    }

    setError("");
    // Aqui você faria a chamada à API para atualizar os dados
    setUserData({
      ...userData,
      name: fullName,
      email: email,
    });
    console.log("Dados atualizados com sucesso!");
    navigation.goBack();
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Dados Pessoais" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            Nesta página, você pode alterar seu nome completo e endereço de e-mail.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Nome Completo */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <RPGBorder 
              width={345} 
              height={50} 
              tileSize={8} 
              centerColor={COLORS.white}
              borderType="white"
            >
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999999"
                value={fullName}
                onChangeText={setFullName}
              />
            </RPGBorder>
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <RPGBorder 
              width={345} 
              height={50} 
              tileSize={8} 
              centerColor={COLORS.white}
              borderType="white"
            >
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </RPGBorder>
          </View>

          {/* Mensagem de Erro */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {/* Informações Adicionais */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              • O nome deve ter no mínimo 3 caracteres
            </Text>
            <Text style={styles.infoText}>
              • O nome não deve conter números
            </Text>
            <Text style={styles.infoText}>
              • Use um email válido
            </Text>
          </View>
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <MenuButton
            title="Salvar Alterações"
            onPress={handleSave}
            borderType="blue"
            centerColor={COLORS.secondary}
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
    marginTop: 8,
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
  errorText: {
    color: "#FF4444",
    fontSize: 16,
    fontFamily: "VT323",
    marginTop: 12,
    textAlign: 'center',
  },
  infoContainer: {
    width: 345,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  infoText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 6,
    lineHeight: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
});