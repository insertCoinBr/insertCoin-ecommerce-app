import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import BottomTabBar from "../../components/BottomTabBar";
import MenuButton from "../../components/MenuButton";
import ProfileHeader from "../../components/ProfileHeader";
import RPGBorder from "../../components/RPGBorder";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#ffff"
};

export default function PersonalData({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Home');

  // Dados do usuário (normalmente viriam de um contexto/API)
   const [userData, setUserData] = useState({
      name: "Tio do Claudio",
      email: "email@email.com",
      avatar: null,
      coins: 150,
    });

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Home");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };
  
const [cardName, setCardName] = useState('');
  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Dados Pessoais" 
      />

      <View style={styles.content}>
        
{/* Header com Avatar e Informações */}
        <ProfileHeader
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          coins={userData.coins}
          borderType="blue"
          centerColor={COLORS.secondary}
        />


        {/* Texto */}
        <Text style={styles.Text}>Nesta página, você pode alterar seu nome completo e endereço de e-mail.</Text>


        {/* Nome Completo */}
        <View style={styles.inputWrapper}>
          <RPGBorder 
            width={345} 
            height={50} 
            tileSize={8} 
            centerColor={COLORS.white}
            borderType="white"
            >
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#000000ff"
            value={cardName}
            onChangeText={setCardName}
            />
          </RPGBorder>
        </View>

        {/* Nome Completo */}
        <View style={styles.inputWrapper}>
          <RPGBorder 
           width={345} 
           height={50} 
           tileSize={8} 
           centerColor={COLORS.white}
           borderType="white"
          >
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000000ff"
            value={cardName}
            onChangeText={setCardName}
          />
          </RPGBorder>
        </View>

        {/* Botão Continue*/}
        <View style={styles.buttonContainer}>
          <MenuButton
            title="Continue"
            onPress={() => navigation.navigate('ProductList')}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
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
  Text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    color: "#000000ff",
    fontSize: 16,
    fontFamily: "VT323",
    paddingHorizontal: 12,
    textAlign: 'center',
    paddingVertical: 0,
  },
  inputWrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
});