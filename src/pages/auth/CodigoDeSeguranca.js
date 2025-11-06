import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";

import Logo from '../../components/app/Logo';
import CodeInput from '../../components/app/CodeInput';
import CustomButton from '../../components/app/CustomButton';

export default function CodigoDeSeguranca({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { email } = useContext(AuthContext);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        <Text style={styles.textLogin}>Código de Segurança</Text>
        <Text style={styles.textLink2}>Código enviado para seu email:</Text>
        <Text style={styles.textLink2}>{email}</Text>

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <CodeInput
          length={6}
          value={code}
          onChangeCode={setCode}
        />

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