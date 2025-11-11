import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { validateCode, verifyEmail, forgotPassword } from '../../services/authService';

import Logo from '../../components/app/Logo';
import CodeInput from '../../components/app/CodeInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function CodigoDeSeguranca({ route }) {
  const navigation = useNavigation();
  const { tempUserData, setTempUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const isCodeComplete = code.every(digit => digit !== "");

  const handleValidateCode = async () => {
    if (!isCodeComplete) {
      setError("Por favor, preencha o código completo.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const codeString = code.join("");
      const verificationType = tempUserData.verificationType || 'VERIFY_EMAIL';

      // Valida o código
      await validateCode(tempUserData.email, codeString, verificationType);

      // Atualiza o contexto indicando que o código foi verificado
      setTempUserData({
        ...tempUserData,
        isVerified: true,
      });

      // Navega para a tela de criar senha
      navigation.navigate('CriarSenha');
    } catch (apiError) {
      console.error("Erro ao validar código:", apiError);
      setError(apiError.message || "Código inválido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");

    try {
      const verificationType = tempUserData.verificationType || 'VERIFY_EMAIL';

      // Reenvia o código baseado no tipo de verificação
      if (verificationType === 'VERIFY_EMAIL') {
        await verifyEmail(tempUserData.email);
      } else if (verificationType === 'FORGOT_PASSWORD') {
        await forgotPassword(tempUserData.email);
      }

      setCode(["", "", "", "", "", ""]);
      setError("");
    } catch (apiError) {
      console.error("Erro ao reenviar código:", apiError);
      setError(apiError.message || "Erro ao reenviar código. Tente novamente.");
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

        <Text style={styles.textLogin}>Código de Segurança</Text>
        <Text style={styles.textLink2}>Código enviado para seu email:</Text>
        <Text style={styles.textLink2}>{tempUserData.email}</Text>

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <CodeInput
          length={6}
          value={code}
          onChangeCode={setCode}
        />

        <ErrorMessage message={error} />

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <CustomButton
          title="Validar Código"
          onPress={handleValidateCode}
          loading={loading}
          disabled={!isCodeComplete}
          variant="primary"
        />

        <CustomButton
          title="Reenviar Código"
          onPress={handleResend}
          loading={loading}
          variant="secondary"
          style={styles.buttonResend}
          textStyle={styles.textResend}
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
    paddingTop: 30,
    paddingBottom: 30,
  },
  spacer: {
    height: 15,
  },
  textLogin: {
    fontSize: 26,
    color: '#1F41BB',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  textLink2: {
    textAlign: 'center',
    color: '#1F41BB',
    fontSize: 14,
    marginTop: 3,
  },
  buttonResend: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F1F4FF',
    borderRadius: 10,
    width: '100%',
    fontSize: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResend: {
    color: '#626262',
    fontWeight: 'bold',
    fontSize: 20,
  },
});