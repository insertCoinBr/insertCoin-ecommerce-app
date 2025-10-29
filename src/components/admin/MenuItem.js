import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuItem({ 
  title, 
  onPress, 
  icon = "chevron-forward-outline",
  style 
}) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, style]}
      onPress={onPress}
    >
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name={icon} size={18} color="#aaa" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#1B254F",
    borderBottomWidth: 1,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
});