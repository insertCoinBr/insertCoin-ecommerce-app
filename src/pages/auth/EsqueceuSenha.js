import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Import de Componentes
import Logo from '../../components/Logo';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

export default function EsqueceuSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
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
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
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
});