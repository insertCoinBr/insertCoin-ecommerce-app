import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import OrderListItem from "../../components/admin/OrderListItem";

export default function Orders() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  // Mock data - substitua com dados reais da sua API
  const Orders = [
    { id: "1000000039", date: "22/08/2025", status: "Created" },
    { id: "1000000038", date: "21/08/2025", status: "Created" },
    { id: "1000000037", date: "20/08/2025", status: "Created" },
    { id: "1000000036", date: "21/08/2025", status: "Created" },
    { id: "1000000035", date: "20/08/2025", status: "Created" },
    { id: "1000000034", date: "21/08/2025", status: "Created" },
    { id: "1000000033", date: "20/08/2025", status: "Created" },
    { id: "1000000032", date: "21/08/2025", status: "Created" },
    { id: "1000000031", date: "20/08/2025", status: "Created" },
  ];

  const filteredOrders = Orders.filter(order =>
    order.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOrderPress = (order) => {
    navigation.navigate("OrderDetails", { order });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
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
      <Text style={styles.title}>Orders</Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#ccc" />
        <TextInput
          placeholder="Type to search"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.orderColumn]}>Order</Text>
        <Text style={[styles.headerText, styles.dateColumn]}>Date</Text>
        <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
      </View>

      {/* Order List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order, index) => (
          <OrderListItem
            key={index}
            order={order}
            onPress={() => handleOrderPress(order)}
          />
        ))}
      </ScrollView>
      </View>
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141B3A",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
    marginBottom: 10,
  },
  headerText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
  },
  orderColumn: {
    flex: 1,
  },
  dateColumn: {
    flex: 1,
    textAlign: "center",
  },
  statusColumn: {
    flex: 1,
    textAlign: "right",
  },
  list: {
    flex: 1,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});