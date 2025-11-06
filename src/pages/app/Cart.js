import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const COUPONS_STORAGE_KEY = '@insertcoin:coupons';

export default function Cart({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState("Cart");
  const [cupom, setCupom] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(null);

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
      loadAppliedCoupon();
    }, [])
  );

  //Carrega cupom aplicado anteriormente
  const loadAppliedCoupon = async () => {
    try {
      const couponJson = await AsyncStorage.getItem(COUPONS_STORAGE_KEY);
      if (couponJson) {
        const couponData = JSON.parse(couponJson);
        setCupomAplicado(couponData.code);
        setDiscount(couponData.discount);
        setCupom(couponData.code);
      }
    } catch (error) {
      console.error('Erro ao carregar cupom:', error);
    }
  };

  //Salva o cupom aplicado
  const saveCoupon = async (code, discountValue) => {
    try {
      const couponData = {
        code: code,
        discount: discountValue
      };
      await AsyncStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(couponData));
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
    }
  };

  //Remove o cupom salvo
  const removeSavedCoupon = async () => {
    try {
      await AsyncStorage.removeItem(COUPONS_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover cupom:', error);
    }
  };

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

  //CALCULA SUBTOTAL - USA CONTEXT
  const calculateSubtotal = () => {
    return getCartTotal();
  };

  //Calcula total com desconto
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  //Aplica cupom
  const handleApplyCupom = async () => {
    const normalized = cupom.trim().toUpperCase();
    const subtotal = calculateSubtotal();
    let newDiscount = 0;

    if (!normalized) {
      showError("Erro", "Digite um código de cupom.");
      return;
    }

    if (normalized === "PROMO10") {
      newDiscount = subtotal * 0.1;
      setDiscount(newDiscount);
      setCupomAplicado("PROMO10");
      await saveCoupon("PROMO10", newDiscount);
      showSuccess("Cupom aplicado!", "Você ganhou 10% de desconto.");
    } else if (normalized === "FRETEGRATIS") {
      newDiscount = 20.0;
      setDiscount(newDiscount);
      setCupomAplicado("FRETEGRATIS");
      await saveCoupon("FRETEGRATIS", newDiscount);
      showSuccess("Cupom aplicado!", `${formatPrice(20)} de desconto concedido.`);
    } else {
      setDiscount(0);
      setCupomAplicado(null);
      await removeSavedCoupon();
      showError("Cupom inválido", "Verifique o código digitado e tente novamente.");
    }
  };

  //Remove cupom aplicado
  const handleRemoveCoupon = async () => {
    setDiscount(0);
    setCupomAplicado(null);
    setCupom("");
    await removeSavedCoupon();
    showSuccess("Cupom removido", "O desconto foi removido do seu carrinho.");
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

        {/* Cupom */}
        <View style={styles.couponSection}>
          <View style={styles.couponInputWrapper}>
            <RPGBorder
              width={240}
              height="auto"
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
                editable={!cupomAplicado}
              />
            </RPGBorder>
          </View>

          {cupomAplicado ? (
            <TouchableOpacity activeOpacity={0.8} onPress={handleRemoveCoupon}>
              <RPGBorder
                width={90}
                height={50}
                tileSize={8}
                centerColor="#ff4444"
                borderType="red"
                contentPadding={4}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.couponButton}>
                  <Text style={styles.couponButtonText}>Remover</Text>
                </View>
              </RPGBorder>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={handleApplyCupom}>
              <RPGBorder
                width={90}
                height="auto"
                tileSize={8}
                centerColor={COLORS.secondary}
                borderType="blue"
                contentPadding={4}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.couponButton}>
                  <Text style={styles.couponButtonText}>Aplicar</Text>
                </View>
              </RPGBorder>
            </TouchableOpacity>
          )}
        </View>

        {/* Resumo */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(calculateSubtotal())}
            </Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Desconto:</Text>
              <Text style={styles.summaryDiscount}>
                -{formatPrice(discount)}
              </Text>
            </View>
          )}
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
            height="auto"
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
            contentPadding={4}
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