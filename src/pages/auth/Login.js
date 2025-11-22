import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { signin, getMe, clearAllAuthData } from '../../services/authService';
import { isAdminRole } from '../../utils/roleHelper';

import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function Login({ onLogin, onAdminLogin }) {
  const navigation = useNavigation();
  const { setToken, setIsAuthenticated, saveUserData, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Limpa o token sempre que a tela de login for focada
  useFocusEffect(
    React.useCallback(() => {
      const clearAuth = async () => {
        await clearAllAuthData();
        setToken(null);
        setIsAuthenticated(false);
      };
      clearAuth();
    }, [])
  );

  const handleLoginPress = async () => {
    if (!email || !password) {
      setError("Por favor, preencha o email e a senha.");
      return;
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Fazer login e obter token
      const signinResponse = await signin(email, password);

      if (signinResponse.access_token) {
        // 2. Buscar dados do usuário
        const userData = await getMe();

        // 3. Atualizar contexto e salvar no AsyncStorage
        setToken(signinResponse.access_token);
        await saveUserData(userData);
        setIsAuthenticated(true);

        // 4. Redirecionar baseado no tipo de usuário
        // Roles administrativas: ROLE_ADMIN, ROLE_COMMERCIAL, ROLE_MANAGER_STORE -> Área Administrativa
        // Role cliente: ROLE_CLIENT -> Área de Usuário
        if (isAdminRole(userData.roles)) {
          // É Admin, Comercial ou Manager - vai para área administrativa
          onAdminLogin();
        } else {
          // É Cliente - vai para área de usuário
          onLogin();
        }
      }
    } catch (apiError) {
      // Traduzir mensagens de erro para português
      let errorMessage = "Email ou senha inválidos.";

      if (apiError.message) {
        if (apiError.message.toLowerCase().includes("disabled") ||
            apiError.message.toLowerCase().includes("inativo")) {
          errorMessage = "Usuário inativo!";

          // Mostrar popup informativo
          Alert.alert(
            "Conta Inativa",
            "Sua conta está inativa. Por favor, entre em contato com o suporte:\n\ninsertcoin.app@gmail.com",
            [
              {
                text: "OK",
                style: "default"
              }
            ],
            { cancelable: true }
          );
        } else {
          errorMessage = apiError.message;
        }
      }

      setError(errorMessage);
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
        <Text style={styles.textLogin}>Login</Text>
        <View style={styles.spacer} />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <ErrorMessage message={error} />

        <CustomButton
          style={styles.buttonEsqueceu}
          title="Esqueceu Senha?"
          onPress={() => navigation.navigate('EsqueceuSenha')}
          variant="secondary"
        />

        <CustomButton
          title="Logar"
          onPress={handleLoginPress}
          loading={loading}
          variant="primary"
        />

        <CustomButton
          title="Criar Conta"
          onPress={() => navigation.navigate('CriarConta')}
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
  spacer: { height: 20 },
  textLogin: {
    fontSize: 30,
    color: '#1F41BB',
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonEsqueceu: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
  },
});