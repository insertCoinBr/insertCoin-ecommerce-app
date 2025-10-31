import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Import de Componentes
import Logo from '../../components/app/Logo';
import CustomInput from '../../components/app/CustomInput';
import CustomButton from '../../components/app/CustomButton';
import ErrorMessage from '../../components/app/ErrorMessage';
import PasswordRequirement from '../../components/app/PasswordRequirement';

export default function CriarSenha({ route }) {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validações de senha
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!isPasswordValid) {
      setError("A senha não atende aos requisitos mínimos.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.textLogin}>Crie Sua Nova Senha</Text>

      <View style={styles.spacer} />

      <CustomInput 
        placeholder="Senha" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      
      <CustomInput 
        placeholder="Confirme sua Senha" 
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <ErrorMessage message={error} />
      
      <View style={styles.requirementsContainer}>
        <PasswordRequirement 
          text="Mínimo de 8 caracteres" 
          isValid={hasMinLength} 
        />
        <PasswordRequirement 
          text="Pelo menos 1 letra maiúscula" 
          isValid={hasUpperCase} 
        />
        <PasswordRequirement 
          text="Pelo menos 1 letra minúscula" 
          isValid={hasLowerCase} 
        />
        <PasswordRequirement 
          text="Pelo menos 1 número" 
          isValid={hasNumber} 
        />
        <PasswordRequirement 
          text="Pelo menos 1 caractere especial" 
          isValid={hasSpecialChar} 
        />
      </View>
      
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
  requirementsContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 5,
  },
});