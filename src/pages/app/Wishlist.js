import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import WishlistItemCard from "../../components/app/WishlistItemCard";
import RPGBorder from "../../components/app/RPGBorder";
import MenuButton from "../../components/app/MenuButton";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Wishlist({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Notification');

  // Dados da lista de desejos (normalmente viriam de um contexto/estado global)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "HI Gamepad Pro",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 550.00
    },
    {
      id: 2,
      title: "HI Gamepad Standard",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 550.00
    },
    {
      id: 3,
      title: "HI Mouse Gamer",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      price: 550.00
    },
    {
      id: 4,
      title: "HI Teclado Mecânico",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      price: 550.00
    },
    {
      id: 5,
      title: "HI Headset Pro",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      price: 550.00
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Notification");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleRemoveItem = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (product) => {
    console.log('Adicionar ao carrinho:', product.title);
    // Implementar lógica de adicionar ao carrinho
    // Pode remover da wishlist após adicionar
    handleRemoveItem(product.id);
  };

  const handleAddAllToCart = () => {
    console.log('Adicionar todos ao carrinho');
    // Implementar lógica para adicionar todos ao carrinho
    navigation.navigate('Cart');
  };

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  };

  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  if (!fontLoaded) {
    return null;
  }

  // Se a lista está vazia
  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader 
          onBackPress={() => navigation.goBack()} 
          title="Lista de Desejos" 
        />

        <View style={styles.emptyContent}>
          <Image
            source={require('../../../assets/IconsPixel/iconHeartNull.png')}
            style={styles.emptyIcon}
            resizeMode="contain"
          />

          <Text style={styles.emptyTitle}>Sua lista de desejos</Text>
          <Text style={styles.emptyTitle}>está vazia.</Text>

          <View style={styles.buttonContainer}>
            <MenuButton
              title="Explorar Produtos"
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Lista de Desejos" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Itens */}
        {wishlistItems.map((item) => (
          <WishlistItemCard
            key={item.id}
            product={item}
            onRemove={handleRemoveItem}
            onAddToCart={handleAddToCart}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        ))}

        {/* Total */}
        <View style={styles.totalWrapper}>
          <RPGBorder 
            width={345} 
            height={70} 
            tileSize={8} 
            centerColor={COLORS.primary}
            borderType="black"
          >
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
            </View>
          </RPGBorder>
        </View>

        {/* Botão Adicionar Todos ao Carrinho */}
        <TouchableOpacity 
          onPress={handleAddAllToCart}
          activeOpacity={0.8}
          style={styles.addAllButtonWrapper}
        >
          <RPGBorder 
            width={345} 
            height={70} 
            tileSize={8} 
            centerColor={COLORS.secondary}
            borderType="blue"
          >
            <View style={styles.addAllButton}>
              <Text style={styles.addAllButtonText}>ADD IN CART</Text>
            </View>
          </RPGBorder>
        </TouchableOpacity>
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
    paddingBottom: 140,
    paddingTop: 16,
  },
  // Estilos para lista vazia
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 32,
    tintColor: '#666666',
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  // Estilos para lista com itens
  totalWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
    
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
    
  },
  totalValue: {
    color: "#FFD700",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
    
  },
  addAllButtonWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  addAllButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  addAllButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
});