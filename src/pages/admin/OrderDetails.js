import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import InfoRow from "../../components/admin/InfoRow";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { getAdminOrderById, deleteOrder } from "../../services/orderService";

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderPrices, setOrderPrices] = useState({ usd: null, brl: null });
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Buscar detalhes da ordem ao carregar
  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const orderId = order.id || order.orderId;

      // Buscar preços em ambas as moedas
      const [responseUSD, responseBRL] = await Promise.all([
        getAdminOrderById(orderId, 'USD'),
        getAdminOrderById(orderId, 'BRL')
      ]);

      setOrderDetails(responseUSD);
      setOrderPrices({
        usd: responseUSD.totalAmount || responseUSD.totalPrice || responseUSD.total,
        brl: responseBRL.totalAmount || responseBRL.totalPrice || responseBRL.total
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes da ordem:", error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to load order details'
      });
      setShowAlert(true);
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

  const handleDeleteOrder = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      setShowModal(false);

      const orderId = order.id || order.orderId;
      await deleteOrder(orderId);

      setAlertConfig({
        type: 'success',
        message: 'Order cancelled successfully'
      });
      setShowAlert(true);
    } catch (error) {
      console.error("Erro ao deletar ordem:", error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to cancel order'
      });
      setShowAlert(true);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
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

      {/* Title */}
      <Text style={styles.title}>Order</Text>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      ) : orderDetails ? (
        <>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Order ID Card */}
            <View style={styles.idOrder}>
              <Text style={styles.idText}>
                {orderDetails.orderNumber || orderDetails.id || "N/A"}
              </Text>
            </View>

            {/* Order Details */}
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

          {/* Delete Button Fixed at Bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.deleteButton, deleting && styles.deleteButtonDisabled]}
              onPress={handleDeleteOrder}
              disabled={deleting}
            >
              {deleting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.deleteButtonText}>Cancel Order</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load order details</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadOrderDetails}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <ConfirmModal
        visible={showModal}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel this Order?"
        highlightText={orderDetails?.orderNumber || orderDetails?.id || ""}
        confirmText="Cancel Order"
        confirmColor="#EF4444"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        message={alertConfig.message}
        onClose={handleAlertClose}
      />
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
  idOrder: {
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
  buttonContainer: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "#1B254F",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButtonDisabled: {
    backgroundColor: "#AA3333",
    opacity: 0.7,
  },
  deleteButtonText: {
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
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
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