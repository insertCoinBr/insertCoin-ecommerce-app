import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// CONTEXTS
import { AuthContext } from "../../context/AuthContext";

// SERVICES
import { updateMe, getMe } from "../../services/authService";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs para as posições dos campos
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const nameInputRef = useRef(null);

  // Buscar dados do usuário do contexto
  const { user, saveUserData } = useContext(AuthContext);

  // Dados do usuário vindos da API /auth/me
  const userData = {
    name: user?.name || "Usuário",
    email: user?.email || "email@email.com",
    avatar: null,
    coins: user?.point || 0,
  };

  const [fullName, setFullName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const handleSave = async () => {
    // Validações apenas para o nome (email não pode ser alterado)
    if (!fullName.trim()) {
      setError("Por favor, preencha o nome.");
      setSuccess("");
      return;
    }

    // Validação de nome (mínimo 3 caracteres, sem números)
    if (fullName.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      setSuccess("");
      return;
    }

    if (/\d/.test(fullName)) {
      setError("O nome não deve conter números.");
      setSuccess("");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Chamar API para atualizar apenas o nome - envia somente o campo name
      await updateMe({
        name: fullName.trim()
      });

      // 2. Buscar dados atualizados do usuário
      const updatedUser = await getMe();

      // 3. Atualizar contexto com dados atualizados
      await saveUserData(updatedUser);

      setSuccess("Nome alterado com sucesso!");
      setError("");

      // Voltar após 2 segundos
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setError(error.message || 'Erro ao atualizar nome. Tente novamente.');
      setSuccess("");
    } finally {
      setLoading(false);
    }
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
            <TouchableWithoutFeedback onPress={() => nameInputRef.current?.focus()}>
              <View>
                <RPGBorder
                  width={345}
                  height={50}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                >
                  <TextInput
                    ref={nameInputRef}
                    style={styles.input}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor="#999999"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => handleFieldFocus(nameRef)}
                  />
                </RPGBorder>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Email (Somente Leitura) */}
          <View
            ref={emailRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Email</Text>
            <RPGBorder
              width={345}
              height={50}
              tileSize={8}
              centerColor="#E0E0E0"
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

          {/* Mensagem de Sucesso */}
          {success ? (
            <Text style={styles.successText}>✓ {success}</Text>
          ) : null}

          {/* Informações Adicionais */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              • O nome deve ter no mínimo 3 caracteres
            </Text>
            <Text style={styles.infoText}>
              • O nome não deve conter números
            </Text>
          </View>
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <MenuButton
            title={loading ? "Salvando..." : "Salvar Alterações"}
            onPress={handleSave}
            borderType="blue"
            centerColor={COLORS.secondary}
            disabled={loading}
          />
        </View>
      </ScrollView>
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
  successText: {
    color: "#4ADE80",
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