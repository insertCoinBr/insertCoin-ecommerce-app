import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function CartListItem({ cart, onPress }) {
  return (
    <TouchableOpacity style={styles.cartItem} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.cartId}>{cart.id}</Text>
        <Text style={styles.date}>{cart.date}</Text>
        <Text style={styles.status}>{cart.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartItem: {
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
  cartId: {
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