import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity, 
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function CriarSenha({ route }) {
  const navigation = useNavigation(); // Inicializa o hook
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navega para a tela de Login após criar a senha
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={styles.container}>

      <Image source={require('../../../assets/InsertCoin.png')} style={{ width: 119, height: 142 }} />

      <Text style={styles.textLogin}>Cria Sua Nova Senha</Text>

      <View style={styles.spacer} />

      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Confirme sua Senha" secureTextEntry={true} />
      
      <Text style={styles.textLink2}>Mínimo de 8 caracteres</Text>
      <Text style={styles.textLink2}>Pelo menos 1 letra maiúscula</Text>
      <Text style={styles.textLink2}>Pelo menos 1 letra minúscula</Text>
      <Text style={styles.textLink2}>Pelo menos 1 número</Text>
      <Text style={styles.textLink2}>Pelo menos 1 caractere especial</Text>
      
      <TouchableOpacity style={styles.buttonLogar} onPress={handleLogin} disabled={loading}>
        {/* CORREÇÃO: Mostra o ActivityIndicator ou o Texto baseado no estado 'loading' */}
        {loading ? (
          <ActivityIndicator size="small" color="#ffffffff" />
        ) : (
          <Text style={styles.buttonLogarText}>Continue</Text>
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
  input: { 
    margin: 10,
    height: 60, 
    width: '100%', 
    marginTop: 30, 
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2, // Em vez de 'border'
    borderColor: '#1F41BB', // Em vez de 'border'
    backgroundColor: '#F1F4FF', // Em vez de 'background'
  },
  buttonEsqueceu: { 
    marginTop: 10, 
    padding: 10, 
    alignSelf: 'flex-end', // Posiciona o botão à direita
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
  // --- ESTILOS NOVOS PARA OS TEXTOS ---
  buttonLogarText: {
    color: '#ffffff', // Cor branca para o texto do botão de logar
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonCriarConta: { 
    marginTop: 10, 
    padding: 10,
    
  },
  textLink: {
    color: '#1F41BB',
    fontSize: 16,  // Cor azul para os links "Esqueceu Senha" e "Criar Conta"
  },
  textLink2: {
    alignSelf: 'flex',
    color: '#1F41BB',
    fontSize: 16,  // Cor azul para os links "Esqueceu Senha" e "Criar Conta"
  },
});