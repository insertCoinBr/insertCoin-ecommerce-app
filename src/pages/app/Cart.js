import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

//IMPORTAR O CARTCONTEXT
import { CartContext } from "../../context/CartContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useAlert } from "../../context/AlertContext";

//COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import CartItemCard from "../../components/app/CartItemCard";
import RPGBorder from "../../components/app/RPGBorder";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#ffffffff"
};

export default function Cart({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState("Cart");

  //USAR O CARTCONTEXT
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    loading
  } = useContext(CartContext);

  //USAR O ALERT CUSTOMIZADO
  const { showSuccess, showError, showConfirm } = useAlert();

  //USAR O CURRENCYCONTEXT
  const { formatPrice } = useContext(CurrencyContext);

  //Redireciona para EmptyCart se não houver itens
  useEffect(() => {
    if (!loading && cartItems.length === 0) {
      navigation.replace("EmptyCart");
    }
  }, [cartItems.length, loading, navigation]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Cart");
    }, [])
  );

  //INCREMENTA QUANTIDADE - USA CONTEXT
  const handleIncrement = async (itemId) => {
    await incrementQuantity(itemId);
  };

  //DECREMENTA QUANTIDADE - USA CONTEXT
  const handleDecrement = async (itemId) => {
    await decrementQuantity(itemId);
  };

  //REMOVE ITEM - USA CONTEXT
  const handleRemove = async (itemId) => {
    showConfirm(
      "Remover Item",
      "Deseja realmente remover este item do carrinho?",
      async () => {
        await removeFromCart(itemId);
        showSuccess("Item Removido", "O item foi removido do carrinho.");
      },
      {
        confirmText: "Remover",
        cancelText: "Cancelar",
        type: "error"
      }
    );
  };

  //CALCULA TOTAL - USA CONTEXT
  const calculateTotal = () => {
    return getCartTotal();
  };

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  if (!fontLoaded || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader onBackPress={() => navigation.goBack()} title="Carrinho" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando carrinho...</Text>
        </View>
        <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader onBackPress={() => navigation.goBack()} title="Carrinho" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*LISTA DE ITENS DO CONTEXT */}
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            product={item}
            quantity={item.quantity}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
            onRemove={() => handleRemove(item.id)}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        ))}

        {/* Resumo */}
        <View style={styles.summarySection}>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
          </View>
        </View>

        {/* Botão Finalizar Compra */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Payment", {
              total: calculateTotal(),
            })
          }
          activeOpacity={0.8}
          style={styles.checkoutButtonWrapper}
        >
          <RPGBorder
            width={345}
            height={61}
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
            contentPadding={8}
            contentJustify="center"
            contentAlign="center"
          >
            <View style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </View>
          </RPGBorder>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 16,
  },
  summarySection: {
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  totalRow: {
    marginTop: 0,
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
  checkoutButtonWrapper: {
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
  },
});