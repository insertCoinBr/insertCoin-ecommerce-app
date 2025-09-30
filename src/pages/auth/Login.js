import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

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
    <View style={styles.container}>
      <Image source={require('../../../assets/InsertCoin.png')} style={{ width: 119, height: 142 }} />
      <Text style={styles.textLogin}>Login</Text>
      <View style={styles.spacer} />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.buttonEsqueceu}
        onPress={() => navigation.navigate('EsqueceuSenha')}
      >
        <Text style={styles.textLink}>Esqueceu Senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLogar}
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLoginPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffffff" />
        ) : (
          <Text style={styles.buttonLogarText}>Logar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCriarConta}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.textLink}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCriarConta}
        onPress={showValidLoginsAlert}
      >
        <Text style={styles.textLink}>Usar login de teste?</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  spacer: { height: 30 },
  textLogin: { 
    fontSize: 30, 
    color: '#1F41BB', 
    fontWeight: 'bold',
    marginTop: 58,
  },
  input: { 
    height: 60, 
    width: '100%', 
    marginTop: 30, 
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#1F41BB',
    backgroundColor: '#F1F4FF',
  },
  buttonEsqueceu: { 
    marginTop: 10, 
    padding: 10, 
    alignSelf: 'flex-end',
  },
  buttonLogar: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#1F41BB', 
    borderRadius: 10,
    width: '100%',
    fontSize: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonCriarConta: { 
    marginTop: 10, 
    padding: 10,
  },
  textLink: {
    color: '#1F41BB',
    fontSize: 16,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});