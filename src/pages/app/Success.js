import React, { useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import MenuButton from "../../components/app/MenuButton";
import RPGBorder from "../../components/app/RPGBorder";

// CONTEXTS
import { CartContext } from "../../context/CartContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useAlert } from "../../context/AlertContext";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Success({ navigation, route }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Cart');
  const [ratings, setRatings] = useState({});

  const { formatPrice } = useContext(CurrencyContext);
  const { showSuccess } = useAlert();

  // Pegar dados do pedido da navegação
  const { orderNumber, items = [], total = 0 } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Cart");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleRating = (productId, rating) => {
    setRatings(prev => ({ ...prev, [productId]: rating }));
    showSuccess(
      'Avaliação Recebida!',
      `Obrigado por avaliar com ${rating} estrela${rating > 1 ? 's' : ''}!`
    );
  };

  const renderStars = (productId) => {
    const currentRating = ratings[productId] || 0;

    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRating(productId, star)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={star <= currentRating ? "star" : "star-outline"}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Botão Voltar e Número do Pedido */}
        <View style={styles.header}>
          <MenuButton
            title="VOLTAR"
            onPress={() => navigation.navigate('ProductList')}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
          <Text style={styles.orderNumber}>N Pedido {orderNumber || 'N/A'}</Text>
        </View>

        {/* Lista de Produtos */}
        {items.map((item, index) => (
          <View key={index} style={styles.productCardWrapper}>
            <RPGBorder
              widthPercent={0.9}
              height={180}
              tileSize={8}
              centerColor={COLORS.primary}
              borderType="blue"
              contentPadding={12}
            >
              <View style={styles.productCard}>
                {/* Imagem do Produto */}
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.productImagePlaceholder}>
                    <Ionicons name="game-controller" size={40} color="#666" />
                  </View>
                )}

                {/* Info do Produto */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.title || item.name || 'Produto'}
                  </Text>
                  <Text style={styles.productQty}>Qtd: {item.quantity || 1}</Text>
                  <Text style={styles.productPrice}>
                    {formatPrice(item.price)}
                  </Text>
                  <Text style={styles.productSubtotal}>
                    Subtotal: {formatPrice((item.price || 0) * (item.quantity || 1))}
                  </Text>

                  {/* Avaliação */}
                  <View style={styles.ratingSection}>
                    <Text style={styles.ratingLabel}>Avaliar:</Text>
                    {renderStars(item.id)}
                  </View>
                </View>
              </View>
            </RPGBorder>
          </View>
        ))}

        {/* Total */}
        <View style={styles.totalWrapper}>
          <RPGBorder
            widthPercent={0.9}
            height={66}
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
            contentPadding={12}
            contentJustify="center"
          >
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </RPGBorder>
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
    paddingTop: 20,
    paddingBottom: 140,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    marginBottom: 20,
  },
  orderNumber: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: 'center',
    marginTop: 12,
  },
  productCardWrapper: {
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    gap: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#2A2042',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  productQty: {
    color: "#CCCCCC",
    fontSize: 14,
    fontFamily: "VT323",
  },
  productPrice: {
    color: "#FFD700",
    fontSize: 16,
    fontFamily: "VT323",
  },
  productSubtotal: {
    color: "#CCCCCC",
    fontSize: 14,
    fontFamily: "VT323",
  },
  ratingSection: {
    marginTop: 8,
  },
  ratingLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  totalWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
  },
  totalValue: {
    color: "#FFD700",
    fontSize: 24,
    fontFamily: "VT323",
  },
});