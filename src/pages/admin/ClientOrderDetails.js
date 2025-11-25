import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import InfoRow from "../../components/admin/InfoRow";
import { getAdminOrderById } from "../../services/orderService";

export default function ClientOrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, client } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderPrices, setOrderPrices] = useState({ usd: null, brl: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const orderId = order.orderId || order.uuid || order.id;

      // Buscar preços em ambas as moedas
      const [responseUSD, responseBRL] = await Promise.all([
        getAdminOrderById(orderId, 'USD'),
        getAdminOrderById(orderId, 'BRL')
      ]);

      console.log('Response USD:', responseUSD);
      console.log('Response BRL:', responseBRL);

      setOrderDetails(responseUSD);
      setOrderPrices({
        usd: responseUSD.totalAmount || responseUSD.totalPrice || responseUSD.total,
        brl: responseBRL.totalAmount || responseBRL.totalPrice || responseBRL.total
      });
    } catch (err) {
      console.error("Erro ao buscar detalhes da ordem:", err);
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // Formatar data
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Formatar preço
  const formatPrice = (price, currency = 'USD') => {
    if (price === null || price === undefined) return "N/A";

    if (currency === 'BRL') {
      return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
    } else {
      return `$ ${Number(price).toFixed(2)}`;
    }
  };

  // Formatar detalhes de compra (lista de produtos)
  const formatPurchaseDetails = (items) => {
    if (!items || items.length === 0) return "N/A";
    return items.map(item =>
      `${item.productName || item.name || 'Product'} (x${item.quantity})`
    ).join(', ');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Ionicons name="chevron-back" size={20} color="#A855F7" />
              <Text style={styles.backText}>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
            <Text style={styles.headerTitle}>InsertCoin</Text>
          </View>
        </View>

        <Text style={styles.title}>Order</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A855F7" />
            <Text style={styles.loadingText}>Loading order details...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadOrderDetails}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : orderDetails ? (
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.idCard}>
              <Text style={styles.idText}>
                {orderDetails.orderNumber || orderDetails.id || "N/A"}
              </Text>
            </View>

            <InfoRow
              label="Order Status:"
              value={orderDetails.status || "N/A"}
            />
            <InfoRow
              label="Date and time:"
              value={formatDateTime(orderDetails.createdAt || orderDetails.orderDate)}
            />
            <InfoRow
              label="Full Name:"
              value={orderDetails.customerName || orderDetails.userName || orderDetails.fullName || "N/A"}
            />
            <InfoRow
              label="Email:"
              value={orderDetails.customerEmail || orderDetails.userEmail || orderDetails.email || "N/A"}
            />
            <InfoRow
              label="Total price (USD):"
              value={formatPrice(orderPrices.usd, 'USD')}
            />
            <InfoRow
              label="Total price (BRL):"
              value={formatPrice(orderPrices.brl, 'BRL')}
            />
            <InfoRow
              label="Payment Method:"
              value={orderDetails.paymentMethod || "N/A"}
            />
            <InfoRow
              label="Purchase details:"
              value={formatPurchaseDetails(orderDetails.items || orderDetails.orderItems)}
            />
          </ScrollView>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#ffffffff",
    fontSize: 16,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    color: "#ffffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  idCard: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  idText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#A855F7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});