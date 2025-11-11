import React, { useState, useCallback, useRef, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// CONTEXTS
import { AuthContext } from "../../context/AuthContext";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import MenuButton from "../../components/app/MenuButton";
import ProfileHeader from "../../components/app/ProfileHeader";
import RPGBorder from "../../components/app/RPGBorder";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#FFFFFF"
};

export default function PersonalData({ navigation }) {
  const fontLoaded = useFontLoader();
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [error, setError] = useState("");

  // Refs para as posições dos campos
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // Buscar dados do usuário do contexto
  const { user } = useContext(AuthContext);

  // Dados do usuário vindos da API /auth/me
  const userData = {
    name: user?.name || "Usuário",
    email: user?.email || "email@email.com",
    avatar: null,
    coins: user?.point || 0,
  };

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

  const handleSave = async () => {
    // Validações apenas para o nome (email não pode ser alterado)
    if (!fullName.trim()) {
      setError("Por favor, preencha o nome.");
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

    // TODO: Implementar chamada à API PUT /auth/me/update
    // para atualizar apenas o nome do usuário
    // Exemplo:
    // await updateUserData({ name: fullName });
    // await saveUserData(updatedUser); // Atualizar contexto

    // Por enquanto, apenas volta
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
        title="Dados Pessoais" 
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
            Nesta página, você pode alterar seu nome completo.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Nome Completo */}
          <View 
            ref={nameRef}
            style={styles.inputWrapper}
          >
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
                onFocus={() => handleFieldFocus(nameRef)}
              />
            </RPGBorder>
          </View>

          {/* Email (Somente Leitura) */}
          <View
            ref={emailRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Email (não pode ser alterado)</Text>
            <RPGBorder
              width={345}
              height={50}
              tileSize={8}
              centerColor="#ffffffff"
              borderType="white"
            >
              <TextInput
                style={[styles.input, styles.inputReadOnly]}
                placeholder="Digite seu email"
                placeholderTextColor="#999999"
                value={email}
                editable={false}
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
              • O email não pode ser alterado por questões de segurança
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
    fontSize: 16,
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
  inputReadOnly: {
    color: "#666666",
    backgroundColor: 'transparent',
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
    fontSize: 14,
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