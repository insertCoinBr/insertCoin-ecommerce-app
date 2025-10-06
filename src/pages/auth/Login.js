import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

//Import de Componentes
import Logo from '../../components/Logo';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import ErrorMessage from '../../components/ErrorMessage';

export default function Login({ onLogin }) {
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
        //textStyle={styles.textEsqueceu}
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
  buttonEsqueceu: { 
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
  },
  textEsqueceu: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});