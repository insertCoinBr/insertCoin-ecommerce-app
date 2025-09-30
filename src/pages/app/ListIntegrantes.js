import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Dados do integrante
  const integrante = {
  nome: "Luis Felipe Pagnussat",
  ra: "1134649",
  email: "luisfelipepagnussat55@gmail.com",
  linkedin: "https://www.linkedin.com/in/luis-felipe-pagnussat-36712b26a",
};

// Função para extrair as iniciais do nome
const getInitials = (name) => {
  const names = name.split(' ');
  const firstNameInitial = names[0] ? names[0][0] : '';
  const lastNameInitial = names.length > 1 ? names[names.length - 1][0] : '';
  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
};

export default function ListIntegrantes({ route }) {

  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const slideAnim = useRef(new Animated.Value(30)).current; 


  useEffect(() => {
Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    console.log("entrou na lista de integrantes");
    if (route?.params) {
      console.log("params recebidos:", route.params);
    }
  }, [route, fadeAnim, slideAnim]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.card, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials(integrante.nome)}</Text>
            </View>
            <Text style={styles.nome}>{integrante.nome}</Text>
            <Text style={styles.funcao}>Automatizador de Testes QA</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.infoRow}>
              <Icon name="identifier" size={22} color="#8A95A5" />
              <Text style={styles.infoText}>RA: {integrante.ra}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="email-outline" size={22} color="#8A95A5" />
              <Text style={styles.infoText} onPress={() => Linking.openURL(`mailto:${integrante.email}`)}>{integrante.email}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => Linking.openURL(integrante.linkedin)}
            >
              <Icon name="send" size={20} color="#FFF" />
              <Text style={styles.buttonText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  initialsContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  initialsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  funcao: {
    fontSize: 16,
    color: '#8A95A5',
    marginTop: 5,
  },
  body: {
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginLeft: 15,
  },
  footer: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
