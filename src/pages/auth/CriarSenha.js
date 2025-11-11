import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { signup, resetPassword } from '../../services/authService';

//Import de Componentes
import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';
import PasswordRequirement from '../../components/app/PasswordRequirement';

export default function CriarSenha({ route }) {
  const navigation = useNavigation();
  const { tempUserData, clearTempData } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validações de senha
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleContinue = async () => {
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

    if (!tempUserData.isVerified) {
      setError("Email não verificado. Por favor, valide o código primeiro.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const verificationType = tempUserData.verificationType;

      if (verificationType === 'VERIFY_EMAIL') {
        // Criar nova conta
        await signup({
          name: tempUserData.name,
          email: tempUserData.email,
          password: password,
        });
      } else if (verificationType === 'FORGOT_PASSWORD') {
        // Resetar senha
        await resetPassword(tempUserData.email, password);
      }

      // Limpar dados temporários
      clearTempData();

      // Navegar para login
      navigation.navigate('Login');
    } catch (apiError) {
      console.error("Erro ao criar senha:", apiError);
      setError(apiError.message || "Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        <Text style={styles.textLogin}>Crie Sua Nova Senha</Text>

        <View style={styles.spacer} />

        <CustomInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <CustomInput
          placeholder="Confirme sua Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <ErrorMessage message={error} />

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

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          variant="primary"
        />

        <CustomButton
          title="Teste Navegar Login"
          onPress={() => navigation.navigate('Login')}
          variant="secondary"
        />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  spacer: {
    height: 20
  },
  textLogin: {
    fontSize: 30,
    color: '#1F41BB',
    fontWeight: 'bold',
    marginTop: 20,
  },
  requirementsContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 5,
  },
});