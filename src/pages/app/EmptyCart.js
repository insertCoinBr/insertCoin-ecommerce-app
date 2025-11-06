import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

//IMPORTAR O CARTCONTEXT
import { CartContext } from "../../context/CartContext";

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

export default function EmptyCart({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Cart');

  //USAR O CARTCONTEXT
  const { cartItems, loading } = useContext(CartContext);

  //Se tiver itens, redireciona para Cart
  useEffect(() => {
    if (!loading && cartItems.length > 0) {
      navigation.replace("carts");
    }
  }, [cartItems.length, loading, navigation]);

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
        onBackPress={() => navigation.goBack()} 
        title="Carrinho" 
      />

      <View style={styles.content}>
        {/* Emoji Triste */}
        <Image
          source={require('../../../assets/IconsPixel/iconSadEmoji.png')}
          style={styles.emoji}
          resizeMode="contain"
        />

        {/* Texto */}
        <Text style={styles.title}>Seu carrinho</Text>
        <Text style={styles.title}>está vazio.</Text>

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
    fontSize: 32,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
});