import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../../components/InputFields";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from 'axios';

// Paleta de cores consistente
const COLORS = {
  background: '#F7F8FA',
  primary: '#4C38A4',
  textDark: '#212121',
  text: '#333333',
  textMuted: '#666666',
  error: '#D32F2F',
};

export default function Login({ onLogin }) {
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
        console.log('Login bem-sucedido');
        onLogin();
      }
    } catch (apiError) {
      console.error("Erro no login:", apiError);
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

          <View style={styles.header}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Faça login para continuar.</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              value={username}
              onChangeText={setUsername}
              placeholder="Usuário"
              keyboardType="default"
            />
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <ButtonPrimary
              title={loading ? "Entrando..." : "Entrar"}
              onPress={handleLoginPress}
              disabled={loading}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={showValidLoginsAlert}>
              <Text style={styles.footerText}>Usar login de teste?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 14,
  },
});