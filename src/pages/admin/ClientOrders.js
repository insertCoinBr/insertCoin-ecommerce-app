import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function ClientOrders() {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params;
  const [searchText, setSearchText] = useState("");

  const orders = [
    { id: "1000000009", date: "22/08/2025", status: "Completed" },
    { id: "1000000008", date: "21/08/2025", status: "Completed" },
    { id: "1000000007", date: "20/08/2025", status: "Completed" },
    { id: "1000000006", date: "18/08/2025", status: "Completed" },
    { id: "1000000005", date: "15/08/2025", status: "Completed" },
    { id: "1000000004", date: "10/08/2025", status: "Completed" },
    { id: "1000000003", date: "08/08/2025", status: "Completed" },
    { id: "1000000002", date: "04/08/2025", status: "Completed" },
    { id: "1000000001", date: "01/08/2025", status: "Completed" },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOrderPress = (order) => {
    navigation.navigate("ClientOrderDetails", { order, client });
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>Orders of Client</Text>
      <Text style={styles.clientName}>Client: {client.name}</Text>

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

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.orderColumn]}>Order</Text>
        <Text style={[styles.headerText, styles.dateColumn]}>Date</Text>
        <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderItem}
            onPress={() => handleOrderPress(order)}
          >
            <View style={styles.row}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.date}>{order.date}</Text>
              <Text style={styles.status}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    textAlign: "center",
  },
  clientName: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
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
  orderItem: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  date: {
    color: "#aaa",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  status: {
    color: "#aaa",
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});