import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import InfoRow from "../../components/admin/InfoRow";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });

  // Mock data - substitua com dados reais da sua API
  const orderDetails = {
    id: order.id,
    status: "Created",
    dateTime: "22/08/2025 - 10:30:24",
    fullName: "Anderson Bohnem",
    email: "andersonbohnem@insertcoin.com.br",
    totalPrice: "R$ 200,00",
    purchaseDetails: "Red Dead Redemption 2",
  };

  const handleDeleteOrder = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Aqui você faria a chamada à API para deletar o carrinho
    setShowModal(false);
    setAlertConfig({ type: 'success', message: 'Order deleted successfully' });
    setShowAlert(true);
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
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Order ID Card */}
        <View style={styles.idOrder}>
          <Text style={styles.idText}>{orderDetails.id}</Text>
        </View>

        {/* Order Details */}
        <InfoRow label="Order Status:" value={orderDetails.status} />
        <InfoRow label="Date and time:" value={orderDetails.dateTime} />
        <InfoRow label="Full Name:" value={orderDetails.fullName} />
        <InfoRow label="Email:" value={orderDetails.email} />
        <InfoRow label="Total price:" value={orderDetails.totalPrice} />
        <InfoRow label="Purchase details:" value={orderDetails.purchaseDetails} />
      </ScrollView>

      {/* Delete Button Fixed at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteOrder}
        >
          <Text style={styles.deleteButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Order?"
        highlightText={orderDetails.id}
        confirmText="Delete"
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
});