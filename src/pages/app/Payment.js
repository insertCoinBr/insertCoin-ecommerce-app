import React, { useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

//  IMPORTAR OS CONTEXTS
import { CartContext } from "../../context/CartContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useAlert } from "../../context/AlertContext";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import PaymentMethodCard from "../../components/app/PaymentMethodCard";
import RPGBorder from "../../components/app/RPGBorder";

// SERVICES
import { createOrderPix, createOrderCard } from "../../services/orderService";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  white: "#ffffffff",
};

export default function Payment({ navigation, route }) {
  const fontLoaded = useFontLoader();
  const { currency, formatPrice } = useContext(CurrencyContext);
  const { showSuccess, showError } = useAlert();

  //USAR O CARTCONTEXT
  const { getCartTotal, clearCart, cartItems } = useContext(CartContext);

  const [activeTab, setActiveTab] = useState('Cart');
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [loading, setLoading] = useState(false);

  // Dados de pagamento
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  //Total do carrinho vindo do CONTEXT ou da navegação
  const { total: routeTotal } = route.params || {};
  const total = routeTotal || getCartTotal();

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Cart");
      if (selectedPayment === 'pix' && currency === 'USD') {
        setSelectedPayment('credit');
      }
    }, [currency])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  //FINALIZAR COMPRA - CHAMA API
  const handleFinalizePurchase = async () => {
    // Validações
    if (cartItems.length === 0) {
      showError('Carrinho Vazio', 'Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }

    if (selectedPayment === 'credit' && (!cardName || !cardNumber || !cardDate || !cardCVV)) {
      showError('Dados Incompletos', 'Por favor, preencha todos os dados do cartão');
      return;
    }

    setLoading(true);

    try {
      // Preparar items do pedido
      const items = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      let orderResponse;

      if (selectedPayment === 'pix') {
        // Criar pedido PIX
        orderResponse = await createOrderPix({
          items,
          currency: currency
        });
      } else {
        // Criar pedido CARTÃO
        // Separar mês e ano da data (formato MMAA)
        const expiryMonth = parseInt(cardDate.substring(0, 2), 10);
        const expiryYear = parseInt('20' + cardDate.substring(2, 4), 10);

        orderResponse = await createOrderCard({
          items,
          currency: currency,
          card: {
            number: cardNumber.replace(/\s/g, ''), // Remove espaços
            holderName: cardName,
            expiryMonth,
            expiryYear,
            cvv: cardCVV
          }
        });
      }

      console.log('Pedido criado com sucesso:', orderResponse);

      // Limpa o carrinho após sucesso
      await clearCart();

      // Mostra mensagem de sucesso e navega
      showSuccess(
        'Pedido Realizado!',
        'Seu pedido foi criado com sucesso.',
        {
          onClose: () => navigation.navigate('Success')
        }
      );
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      showError(
        'Erro ao Processar Pedido',
        error.message || 'Não foi possível processar seu pedido. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Pagamento" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total */}
        <View style={styles.totalWrapper}>
          <RPGBorder
            width={345}
            height={66}
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
            contentPadding={8}
            contentJustify="center"
            contentAlign="center"
          >
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </RPGBorder>
        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>

          <PaymentMethodCard
            title="Cartão de Crédito ou Débito"
            icon={require('../../../assets/IconsPixel/iconCreditCard.png')}
            isSelected={selectedPayment === 'credit'}
            onPress={() => setSelectedPayment('credit')}
            borderType="blue"
            centerColor={COLORS.secondary}
          />

          {/* PIX só se a moeda for BRL */}
          {currency === 'BRL' && (
            <PaymentMethodCard
              title="Pix"
              icon={require('../../../assets/IconsPixel/iconPix.png')}
              isSelected={selectedPayment === 'pix'}
              onPress={() => setSelectedPayment('pix')}
              borderType="blue"
              centerColor={COLORS.secondary}
            />
          )}
        </View>

        {/* Formulário de Cartão de Crédito */}
        {selectedPayment === 'credit' && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Dados do Cartão</Text>

            {/* Nome */}
            <View style={styles.inputWrapper}>
              <RPGBorder
                width={345}
                height={54}
                tileSize={8}
                centerColor={COLORS.white}
                borderType="white"
                contentPadding={8}
                contentJustify="center"
                contentAlign="center"
              >
                <TextInput
                  style={styles.input}
                  placeholder="Nome do Titular"
                  placeholderTextColor="#000000ff"
                  value={cardName}
                  onChangeText={setCardName}
                />
              </RPGBorder>
            </View>

            {/* Número do Cartão */}
            <View style={styles.inputWrapper}>
              <RPGBorder
                width={345}
                height={54}
                tileSize={8}
                centerColor={COLORS.white}
                borderType="white"
                contentPadding={8}
                contentJustify="center"
                contentAlign="center"
              >
                <TextInput
                  style={styles.input}
                  placeholder="Numero do Cartao"
                  placeholderTextColor="#000000ff"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </RPGBorder>
            </View>

            {/* Data e CVV */}
            <View style={styles.rowInputs}>
              <View style={styles.halfInputWrapper}>
                <RPGBorder
                  width={171}
                  height={54}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                  contentPadding={8}
                  contentJustify="center"
                  contentAlign="center"
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Data"
                    placeholderTextColor="#000000ff"
                    value={cardDate}
                    onChangeText={setCardDate}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </RPGBorder>
              </View>
              
              <View style={styles.halfInputWrapper}>
                <RPGBorder
                  width={165}
                  height={54}
                  tileSize={8}
                  centerColor={COLORS.white}
                  borderType="white"
                  contentPadding={8}
                  contentJustify="center"
                  contentAlign="center"
                >
                  <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    placeholderTextColor="#000000ff"
                    value={cardCVV}
                    onChangeText={setCardCVV}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </RPGBorder>
              </View>
            </View>
          </View>
        )}

        {/* Botão Envio de Ordem */}
        <TouchableOpacity
          onPress={handleFinalizePurchase}
          activeOpacity={0.8}
          style={styles.submitButtonWrapper}
          disabled={loading}
        >
          <RPGBorder
            width={345}
            height={66}
            tileSize={8}
            centerColor={loading ? '#666666' : COLORS.secondary}
            borderType="blue"
            contentPadding={8}
            contentJustify="center"
            contentAlign="center"
          >
            <View style={styles.submitButton}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Envio de Ordem</Text>
              )}
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
  totalWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  totalContainer: {
    flex: 1,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: 'center',
    marginBottom: 12,
  },
  formSection: {
    marginBottom: 24,
  },
  inputWrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  input: {
    flex: 1,
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: "VT323",
    paddingHorizontal: 12,
    textAlign: 'center',
    paddingVertical: 0,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 6,
  },
  halfInputWrapper: {
    alignItems: 'center',
  },
  submitButtonWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "VT323",
  },
});