import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import OrderListItem from "../../components/admin/OrderListItem";
import { searchOrders } from "../../services/orderService";

export default function Orders() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Buscar ordens da API
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async (pageNumber = 0, search = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await searchOrders({
        orderNumber: search,
        page: pageNumber,
        size: 10
      });

      // A resposta pode ser um array ou um objeto com content
      const ordersData = Array.isArray(response) ? response : response.content || [];

      if (pageNumber === 0) {
        setOrders(ordersData);
      } else {
        setOrders(prev => [...prev, ...ordersData]);
      }

      // Verificar se tem mais páginas
      if (response.last !== undefined) {
        setHasMore(!response.last);
      } else {
        setHasMore(ordersData.length === 10);
      }

      setPage(pageNumber);
    } catch (err) {
      console.error("Erro ao buscar ordens:", err);
      setError(err.message || "Erro ao carregar ordens");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    loadOrders(0, text);
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
    order.id?.toLowerCase().includes(searchText.toLowerCase())
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
          placeholder="Type to search by order number"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Error Message */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.orderColumn]}>Order</Text>
        <Text style={[styles.headerText, styles.dateColumn]}>Date</Text>
        <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
      </View>

      {/* Order List */}
      {loading && page === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrderListItem
                key={order.id || index}
                order={order}
                onPress={() => handleOrderPress(order)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No orders found</Text>
          )}
        </ScrollView>
      )}
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
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});