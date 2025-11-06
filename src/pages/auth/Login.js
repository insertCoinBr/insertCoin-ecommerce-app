import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function Login({ onLogin, onAdminLogin }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginPress = async () => {
    if (!username || !password) {
      setError("Por favor, preencha o usuário e a senha.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });
      if (response.data.token) {
        onLogin();
      }
    } catch (apiError) {
      console.error("Erro no login:", apiError);
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminPress = () => {
    onAdminLogin();
  };

  const showValidLoginsAlert = () => {
    Alert.alert(
      "Para sua conveniência",
      "Use um login de teste para entrar rapidamente.",
      [
        {
          text: "Usar Login de Teste",
          onPress: () => {
            setUsername("johnd");
            setPassword("m38rmF$");
            setError("");
          }
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
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
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
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

        <CustomButton
          title="Usar login de teste?"
          onPress={showValidLoginsAlert}
          variant="secondary"
        />

        <CustomButton
          title="Teste Navegar Codigo de Segurança"
          onPress={() => navigation.navigate('CodigoDeSeguranca')}
          variant="secondary"
        />

        <CustomButton
          title="Área Administrativa"
          onPress={handleAdminPress}
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