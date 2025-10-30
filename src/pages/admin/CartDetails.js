import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import InfoRow from "../../components/admin/InfoRow";

export default function CartDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart } = route.params;

  // Mock data - substitua com dados reais da sua API
  const cartDetails = {
    id: cart.id,
    status: "Created",
    dateTime: "22/08/2025 - 10:30:24",
    fullName: "Anderson Bohnem",
    email: "andersonbohnem@insertcoin.com.br",
    totalPrice: "R$ 200,00",
    purchaseDetails: "Red Dead Redemption 2",
  };

  const handleDeleteCart = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Aqui você faria a chamada à API para deletar o carrinho
            Alert.alert("Success", "Cart deleted successfully", [
              { text: "OK", onPress: () => navigation.goBack() }
            ]);
          },
        },
      ]
    );
  };

  return (
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
      <Text style={styles.title}>Cart</Text>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart ID Card */}
        <View style={styles.idCard}>
          <Text style={styles.idText}>{cartDetails.id}</Text>
        </View>

        {/* Cart Details */}
        <InfoRow label="Order Status:" value={cartDetails.status} />
        <InfoRow label="Date and time:" value={cartDetails.dateTime} />
        <InfoRow label="Full Name:" value={cartDetails.fullName} />
        <InfoRow label="Email:" value={cartDetails.email} />
        <InfoRow label="Total price:" value={cartDetails.totalPrice} />
        <InfoRow label="Purchase details:" value={cartDetails.purchaseDetails} />
      </ScrollView>

      {/* Delete Button Fixed at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteCart}
        >
          <Text style={styles.deleteButtonText}>Delete Cart</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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