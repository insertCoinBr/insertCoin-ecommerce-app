import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { forgotPassword } from '../../services/authService';

import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function EsqueceuSenha() {
  const navigation = useNavigation();
  const { tempUserData, setTempUserData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email) {
      setError("Por favor, preencha o email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Envia o email para recuperação de senha
      await forgotPassword(email);

      // Salva os dados temporários no contexto
      setTempUserData({
        ...tempUserData,
        email: email,
        verificationType: 'FORGOT_PASSWORD',
        isVerified: false,
      });

      // Navega para a tela de código de segurança
      navigation.navigate('CodigoDeSeguranca');
    } catch (apiError) {
      console.error("Erro ao enviar email:", apiError);
      setError(apiError.message || "Erro ao enviar código. Tente novamente.");
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

        <Text style={styles.textLogin}>Esqueceu sua Senha?</Text>

        <View style={styles.spacer} />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <ErrorMessage message={error} />

        <View style={styles.spacer} />
        <View style={styles.spacer} />

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
});