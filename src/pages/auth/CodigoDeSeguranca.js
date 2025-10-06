import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Import de Componentes
import Logo from '../../components/Logo';
import CodeInput from '../../components/CodeInput';
import CustomButton from '../../components/CustomButton';

export default function CodigoDeSeguranca({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const isCodeComplete = code.every(digit => digit !== "");

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CriarSenha');
    }, 2000);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCode(["", "", "", "", "", ""]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.textLogin}>Código de Segurança</Text>
      <Text style={styles.textLink2}>Código enviado para seu email:</Text>
      <Text style={styles.textLink2}>anderson@insertcoin.com</Text>

      <View style={styles.spacer} />

      <CodeInput 
        length={6}
        value={code}
        onChangeCode={setCode}
      />

      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />  

      <CustomButton
        title="Validar Código"
        onPress={handleLogin}
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
    alignItems: 'center ',
    fontSize: 30, 
    color: '#1F41BB', 
    fontWeight: 'bold',
    marginTop: 58,
  },
  textLink2: {
    alignItems: 'flex-start',
    textAlign: 'left',
    color: '#1F41BB',
    fontSize: 16, 
  },
  buttonResend: {
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#F1F4FF', 
    borderRadius: 10,
    width: '100%',
    fontSize: 20,
    height: 60, // Altura fixa para não mudar com o loading
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResend: {
    color: '#626262',
    fontWeight: 'bold',
    fontSize: 20,
  },
});