import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import { getAdminUserOrders } from "../../services/orderService";

export default function ClientOrders() {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params;
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientOrders();
  }, []);

  const fetchClientOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Buscar pedidos do usuário específico usando a API de admin
      const userId = client.id || client.uuid;
      const response = await getAdminUserOrders(userId, 'USD');

      console.log('Response from API:', response);

      // A resposta pode vir como array ou objeto com propriedade orders/data
      let ordersData = [];
      if (Array.isArray(response)) {
        ordersData = response;
      } else if (response && Array.isArray(response.orders)) {
        ordersData = response.orders;
      } else if (response && Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response && Array.isArray(response.content)) {
        ordersData = response.content;
      } else {
        console.warn('Unexpected response format:', response);
        ordersData = [];
      }

      // Formatar os dados para o formato esperado pela UI
      const formattedOrders = ordersData.map(order => ({
        id: order.orderNumber || order.id || order.uuid,
        uuid: order.uuid || order.id,
        orderId: order.orderId || order.id,
        date: formatDate(order.createdAt || order.orderDate),
        status: translateStatus(order.status),
        rawStatus: order.status
      }));

      setOrders(formattedOrders);
    } catch (err) {
      console.error('Error fetching client orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const translateStatus = (status) => {
    const statusMap = {
      'PAID': 'Concluído',
      'COMPLETED': 'Completed',
      'PENDING': 'Pending',
      'CANCELLED': 'Cancelled',
      'PROCESSING': 'Processing'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (rawStatus) => {
    const colorMap = {
      'PAID': '#4CAF50',        // Verde
      'COMPLETED': '#4CAF50',   // Verde
      'PENDING': '#FFA726',     // Laranja
      'CANCELLED': '#EF5350',   // Vermelho
      'PROCESSING': '#42A5F5'   // Azul
    };
    return colorMap[rawStatus] || '#aaa'; // Cinza padrão
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOrderPress = (order) => {
    navigation.navigate("ClientOrderDetails", { order, client });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchClientOrders}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>
            {searchText ? 'No orders found matching your search' : 'No orders found for this client'}
          </Text>
        </View>
      ) : (
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
                <Text style={[styles.status, { color: getStatusColor(order.rawStatus) }]}>
                  {order.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});