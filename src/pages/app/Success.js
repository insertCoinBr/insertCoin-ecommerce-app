import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import MenuButton from "../../components/app/MenuButton";

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
      <PageHeader
        onBackPress={() => navigation.navigate('ProductList')}
        title="Pedido Confirmado"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            <MenuButton
              title="Continue Comprando"
              onPress={() => navigation.navigate('ProductList')}
              borderType="blue"
              centerColor={COLORS.secondary}
            />
          </View>
        </View>
      </ScrollView>

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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  emoji: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "VT323",
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "VT323",
    textAlign: 'center',
    lineHeight: 26,
  },
  messageSmall: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
});