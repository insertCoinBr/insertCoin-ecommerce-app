import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function AdminHeader({ onToggleView, isAdminView = true }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image 
          source={require("../../../assets/LogoInsetCoin1.png")} 
          style={styles.logo} 
        />
        <Text style={styles.title}>InsertCoin</Text>
      </View>
      {onToggleView && (
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={onToggleView}
        >
          <Text style={styles.viewText}>
            {isAdminView ? "Client" : "Admin"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#1D3CFD",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  viewText: {
    color: "#fff",
    fontSize: 14,
  },
});