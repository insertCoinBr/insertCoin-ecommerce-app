import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function HomeAdminHeader({ onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
        <Text style={styles.title}>InsertCoin</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onLogout}
      >
        <Text style={styles.clientText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
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
  backButton: {
    backgroundColor: "#1D3CFD",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  clientText: {
    color: "#fff",
    fontSize: 14,
  },
});
