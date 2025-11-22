import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { verifyEmail } from '../../services/authService';

import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function CriarConta({ route }) {
  const navigation = useNavigation();
  const { tempUserData, setTempUserData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePress = async () => {
    if (!email || !username) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (username.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    if (/\d/.test(username)) {
      setError("O nome não deve conter números.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Envia o email para verificação
      await verifyEmail(email);

      // Salva os dados temporários no contexto
      setTempUserData({
        ...tempUserData,
        email: email,
        name: username,
        verificationType: 'VERIFY_EMAIL',
        isVerified: false,
      });

      // Navega para a tela de código de segurança
      navigation.navigate('CodigoDeSeguranca');
    } catch (apiError) {
      // Verificar se o erro é de email já cadastrado
      const errorMessage = apiError.message || "";
      const errorData = apiError.data || {};

      if (errorMessage.toLowerCase().includes("already registered") ||
          errorData.status?.toLowerCase().includes("already registered")) {
        setError("Este email já possui uma conta cadastrada. Por favor, faça login.");
      } else {
        console.error("Erro ao enviar email:", apiError);
        setError(errorMessage || "Erro ao enviar código. Tente novamente.");
      }
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
        <Text style={styles.textTitle}>Criar Conta</Text>
        <View style={styles.spacer} />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Nome de Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
        />

        <ErrorMessage message={error} />

        <CustomButton
          title="Continue"
          onPress={handleCreatePress}
          loading={loading}
          variant="primary"
        />

        <CustomButton
          title="Já tenho uma conta"
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
  textTitle: {
    fontSize: 30,
    color: '#1F41BB',
    fontWeight: 'bold',
    marginTop: 20,
  },
});