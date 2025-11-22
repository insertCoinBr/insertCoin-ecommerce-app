import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function OrderListItem({ order, onPress }) {
  // Formatar data se vier no formato ISO
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Usar orderNumber se disponível, senão usa id
  const displayId = order.orderNumber || order.id || "N/A";

  // Usar createdAt, orderDate ou date
  const displayDate = formatDate(order.createdAt || order.orderDate || order.date);

  // Status
  const displayStatus = order.status || "N/A";

  return (
    <TouchableOpacity style={styles.OrderItem} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.orderId}>{displayId}</Text>
        <Text style={styles.date}>{displayDate}</Text>
        <Text style={styles.status}>{displayStatus}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  OrderItem: {
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
});