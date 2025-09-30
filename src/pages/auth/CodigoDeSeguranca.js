import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Adicione este import

export default function CodigoDeSeguranca({ route }) {
  const navigation = useNavigation(); // Inicialize o hook
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navega para a tela de CriarSenha após validar o código
      navigation.navigate('CriarSenha');
    }, 2000);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Aqui você pode mostrar um alerta ou mensagem de sucesso
    }, 2000);
  };

  return (
    <View style={styles.container}>

      <Image source={require('../../../assets/InsertCoin.png')} style={{ width: 119, height: 142 }} />

      <Text style={styles.textLogin}>Codigo de Seguranca</Text>
      <Text style={styles.textLink2}>Codigo enviado para seu email:</Text>
      <Text style={styles.textLink2}>anderson@incertcoin.com</Text>

      <View style={styles.spacer} />

      {/* Agrupando os quadradinhos em uma linha */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.box}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />  

      <TouchableOpacity style={styles.buttonLogar} onPress={handleLogin} disabled={loading}>
              {/* CORREÇÃO: Mostra o ActivityIndicator ou o Texto baseado no estado 'loading' */}
              {loading ? (
                <ActivityIndicator size="small" color="#ffffffff" />
              ) : (
                <Text style={styles.buttonLogarText}>Validar Codigo</Text>
              )}
            </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogar2} onPress={handleResend} disabled={loading}>
              {/* CORREÇÃO: Mostra o ActivityIndicator ou o Texto baseado no estado 'loading' */}
              {loading ? (
                <ActivityIndicator size="small" color="#ffffffff" />
              ) : (
                <Text style={styles.buttonLogarText2}>Reenviar Codigo</Text>
              )}
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
  textLink2: {
    alignSelf: 'flex',
    color: '#1F41BB',
    fontSize: 16,
  },
  // NOVO: container para os quadradinhos ficarem lado a lado
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  box: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 6,
  },
  buttonLogar: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#1F41BB', 
    borderRadius: 10,
    width: '100%',
    fontSize: 20,
    height: 60, // Altura fixa para não mudar com o loading
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogarText: {
    color: '#ffffff', // Cor branca para o texto do botão de logar
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonLogar2: { 
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
  buttonLogarText2: {
    color: '#626262', // Cor branca para o texto do botão de logar
    fontWeight: 'bold',
    fontSize: 20,
  },
});
