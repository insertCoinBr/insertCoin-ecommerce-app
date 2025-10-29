import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import BottomTabBar from "../../components/BottomTabBar";
import CartItemCard from "../../components/CartItemCard";
import RPGBorder from "../../components/RPGBorder";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#ffffffff "
};

export default function Cart({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState("Cart");
  const [cupom, setCupom] = useState("");
  const [discount, setDiscount] = useState(0); // Desconto padrão
  const [cupomAplicado, setCupomAplicado] = useState(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "HI Gamepad Pro",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 550.0,
      quantity: 1,
    },
    {
      id: 2,
      title: "HI Gamepad Standard",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 550.0,
      quantity: 2,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Cart");
    }, [])
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      navigation.replace("EmptyCart");
    }
  }, [cartItems]);

  if (!fontLoaded) {
    return null;
  }

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleIncrement = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  const formatPrice = (value) =>
    `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;

  // 🧾 Função de aplicar cupom
  const handleApplyCupom = () => {
    const normalized = cupom.trim().toUpperCase();
    const subtotal = calculateSubtotal();
    let newDiscount = 0;

    if (normalized === "PROMO10") {
      newDiscount = subtotal * 0.1;
      setDiscount(newDiscount);
      setCupomAplicado("PROMO10");
      Alert.alert("Cupom aplicado!", "Você ganhou 10% de desconto.");
    } else if (normalized === "FRETEGRATIS") {
      newDiscount = 20.0;
      setDiscount(newDiscount);
      setCupomAplicado("FRETEGRATIS");
      Alert.alert("Cupom aplicado!", "R$ 20,00 de desconto concedido.");
    } else {
      setDiscount(0); // volta ao padrão
      setCupomAplicado(null);
      Alert.alert("Cupom inválido", "Verifique o código digitado e tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader onBackPress={() => navigation.goBack()} title="Carrinho" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Itens */}
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

        {/* Cupom */}
        <View style={styles.couponSection}>
          <View style={styles.couponInputWrapper}>
            <RPGBorder
              width={240}
              height={50}
              tileSize={8}
              centerColor="#ffffffff"
              borderType="white"
            >
              <TextInput
                style={styles.couponPlaceholder}
                placeholder="Cupom"
                placeholderTextColor="#000000ff"
                value={cupom}
                onChangeText={setCupom}
              />
            </RPGBorder>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={handleApplyCupom}>
            <RPGBorder
              width={90}
              height={50}
              tileSize={8}
              centerColor={COLORS.secondary}
              borderType="blue"
            >
              <View style={styles.couponButton}>
                <Text style={styles.couponButtonText}>
                  {cupomAplicado ? "Ativo" : "Aplicar"}
                </Text>
              </View>
            </RPGBorder>
          </TouchableOpacity>
        </View>

        {/* Resumo */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(calculateSubtotal())}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Desconto:</Text>
            <Text style={styles.summaryDiscount}>
              -{formatPrice(discount)}
            </Text>
          </View>
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
            height={60}
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
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
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 16,
  },
  couponSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
  },
  couponInputWrapper: {
    justifyContent: "center",
  },
  couponPlaceholder: {
    color: "#000000ff",
    fontSize: 16,
    fontFamily: "VT323",
    textAlign: "center",
    paddingVertical: 0,
  },
  couponButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  couponButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    textAlign: "center",
    paddingVertical: 0,
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
  summaryDiscount: {
    color: "#00FF00",
    fontSize: 18,
    fontFamily: "VT323",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
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
