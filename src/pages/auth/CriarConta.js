// screens/CriarConta/index.js
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Import de Componentes
import Logo from '../../components/Logo';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import ErrorMessage from '../../components/ErrorMessage';

export default function CriarConta({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePress = () => {
    if (!email || !username) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    //Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    //Validação de nome (mínimo 3 caracteres)
    if (username.trim().length < 3) {
  setError("O nome deve ter pelo menos 3 caracteres.");
  return;
}

if (/\d/.test(username)) {
  setError("O nome não deve conter números.");
  return;
}


    //Simula loading e navega para criar senha
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CriarSenha');
    }, 1000);
  };

  return (
    <View style={styles.container}>
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
  spacer: { 
    height: 30 
  },
  textTitle: { 
    fontSize: 30, 
    color: '#1F41BB', 
    fontWeight: 'bold',
    marginTop: 58,
  },
});