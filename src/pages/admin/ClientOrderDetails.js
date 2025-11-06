import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import InfoRow from "../../components/admin/InfoRow";

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, client } = route.params;

  const orderDetails = {
    id: order.id,
    status: "Completed",
    dateTime: "22/08/2025 - 10:30:24",
    fullName: client ? client.name : "Anderson Bohnem",
    email: client ? client.email : "andersonbohnem@insertcoin.com.br",
    totalPrice: "R$ 200,00",
    purchaseDetails: "Red Dead Redemption 2",
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

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.idCard}>
            <Text style={styles.idText}>{orderDetails.id}</Text>
          </View>

          <InfoRow label="Order Status:" value={orderDetails.status} />
          <InfoRow label="Date and time:" value={orderDetails.dateTime} />
          <InfoRow label="Full Name:" value={orderDetails.fullName} />
          <InfoRow label="Email:" value={orderDetails.email} />
          <InfoRow label="Total price:" value={orderDetails.totalPrice} />
          <InfoRow label="Purchase details:" value={orderDetails.purchaseDetails} />
        </ScrollView>
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
});