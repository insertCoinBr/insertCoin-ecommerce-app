import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function OrderListItem({ order, onPress }) {
  return (
    <TouchableOpacity style={styles.OrderItem} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.orderId}>{order.id}</Text>
        <Text style={styles.date}>{order.date}</Text>
        <Text style={styles.status}>{order.status}</Text>
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