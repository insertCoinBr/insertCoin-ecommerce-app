import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import BottomTabBar from "../../components/app/BottomTabBar";
import RPGBorder from '../../components/app/RPGBorder';

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Success({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Cart');

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Cart");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.content}>
        {/* Emoji Feliz */}
        <Image
          source={require('../../../assets/IconsPixel/iconHappyEmoji.png')}
          style={styles.emoji}
          resizeMode="contain"
        />
        {/* Título */}
        <Text style={styles.title}>Sucesso!</Text>

        {/* Mensagem */}
        <Text style={styles.message}>Seu pedido será entregue</Text>
        <Text style={styles.message}>em breve.</Text>
        <Text style={styles.messageSmall}>Obrigado por escolher</Text>
        <Text style={styles.messageSmall}>nosso aplicativo!</Text>

        {/* Botão Continue Comprando */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductList')}
            style={styles.wrapper}
            activeOpacity={0.8}
    >
      <RPGBorder 
        width={340} 
        height={55} 
        tileSize={8} 
        centerColor={COLORS.secondary}
        borderType="blue"
      >
        <View style={styles.container}>
          <Text style={[styles.text]}>
            CONTINUE COMPRANDO     
          </Text>
        </View>
      </RPGBorder>
    </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 50,
    fontFamily: "VT323",
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  messageSmall: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  textContainer: {
    padding: 5,
  },
});