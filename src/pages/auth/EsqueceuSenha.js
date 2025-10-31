import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";

// Import de Componentes
import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';

export default function EsqueceuSenha() {
  const navigation = useNavigation();
  const { email, setEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    // Validação de campo vazio
    if (!email) {
      setError("Por favor, preencha o email.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Limpa erro e simula envio
    setError("");
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Navega para a tela de código de segurança
      navigation.navigate('CodigoDeSeguranca');
    }, 2000);
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.spacer} />  
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
  textLogin: { 
    fontSize: 30, 
    color: '#1F41BB', 
    fontWeight: 'bold',
    marginTop: 58,
  },
});