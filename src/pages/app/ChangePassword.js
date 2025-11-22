import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import MenuButton from "../../components/app/MenuButton";
import ProfileHeader from "../../components/app/ProfileHeader";
import RPGBorder from "../../components/app/RPGBorder";
import PasswordRequirement from '../../components/app/PasswordRequirement';

import useFontLoader from "../../hooks/useFontLoader";
import { AuthContext } from "../../context/AuthContext";
import { updateMe, getStoredToken } from "../../services/authService";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#FFFFFF"
};

export default function ChangePassword({ navigation }) {
  const fontLoaded = useFontLoader();
  const scrollViewRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Refs para as posições dos campos
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Refs para os inputs de texto
  const currentPasswordInputRef = useRef(null);
  const newPasswordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Validações de senha
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  // Função para traduzir erros da API para português
  const translateError = (errorMessage) => {
    const errorTranslations = {
      'Current password is incorrect': 'Senha atual incorreta',
      'current password is incorrect': 'Senha atual incorreta',
      'incorrect password': 'Senha incorreta',
      'wrong password': 'Senha incorreta',
      'invalid password': 'Senha inválida',
      'password is incorrect': 'Senha incorreta',
      'unauthorized': 'Não autorizado',
      'authentication failed': 'Falha na autenticação',
    };

    // Verificar se a mensagem de erro contém alguma das chaves de tradução
    const lowerErrorMsg = errorMessage?.toLowerCase() || '';
    for (const [key, value] of Object.entries(errorTranslations)) {
      if (lowerErrorMsg.includes(key.toLowerCase())) {
        return value;
      }
    }

    // Retornar mensagem padrão se não encontrar tradução
    return 'Erro ao trocar senha. Verifique se a senha atual está correta.';
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContinue = async () => {
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
    setLoading(true);

    try {
      // Verificar token antes de fazer a requisição
      const token = await getStoredToken();
      console.log('=== DEBUG CHANGE PASSWORD ===');
      console.log('Token exists:', !!token);
      console.log('Token preview:', token ? token.substring(0, 30) + '...' : 'NO TOKEN');
      console.log('User data:', user);

      // Chamar API para alterar a senha - envia apenas currentPassword e newPassword
      await updateMe({
        currentPassword: currentPassword,
        newPassword: password
      });

      setSuccess(true);
      setError("");

      // Limpar campos
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");

      // Mostrar mensagem de sucesso e fazer logout após 2 segundos
      // O logout automaticamente redireciona para a tela de login
      setTimeout(async () => {
        console.log('=== LOGOUT INITIATED ===');
        await logout();
        console.log('=== LOGOUT COMPLETED ===');
      }, 2000);
    } catch (error) {
      // Log error details for debugging
      console.log('=== ERROR DETAILS ===');
      console.log('Error message:', error.message);
      console.log('Error statusCode:', error.statusCode);
      console.log('Error data:', error.data);

      const translatedError = translateError(error.message);
      setError(translatedError);
      setSuccess(false);
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
        title="Troca de Senha" 
      />

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {/* Header com Avatar e Informações */}
        <ProfileHeader
          userName={user?.name || "User"}
          userEmail={user?.email || "email@example.com"}
          userAvatar={user?.avatar}
          coins={user?.point || 0}
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
            <TouchableWithoutFeedback onPress={() => currentPasswordInputRef.current?.focus()}>
              <View>
                <RPGBorder
                  width={345}
                  height={50}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                >
                  <TextInput
                    ref={currentPasswordInputRef}
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
            </TouchableWithoutFeedback>
          </View>

          {/* Nova Senha */}
          <View 
            ref={newPasswordRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Nova Senha</Text>
            <TouchableWithoutFeedback onPress={() => newPasswordInputRef.current?.focus()}>
              <View>
                <RPGBorder
                  width={345}
                  height={50}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                >
                  <TextInput
                    ref={newPasswordInputRef}
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
            </TouchableWithoutFeedback>
          </View>

          {/* Confirmar Nova Senha */}
          <View 
            ref={confirmPasswordRef}
            style={styles.inputWrapper}
          >
            <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
            <TouchableWithoutFeedback onPress={() => confirmPasswordInputRef.current?.focus()}>
              <View>
                <RPGBorder
                  width={345}
                  height={50}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                >
                  <TextInput
                    ref={confirmPasswordInputRef}
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
            </TouchableWithoutFeedback>
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

          {/* Mensagem de Sucesso */}
          {success ? (
            <Text style={styles.successText}>✓ Senha alterada com sucesso!</Text>
          ) : null}
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <MenuButton
            title={loading ? "Salvando..." : "Salvar Alterações"}
            onPress={handleContinue}
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
    paddingBottom: 200,
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
  successText: {
    color: "#4ADE80",
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