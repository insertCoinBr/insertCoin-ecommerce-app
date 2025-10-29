import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeAdm({route}) {
  const navigation = useNavigation();

  const menuItems = [
    { title: "Employees", route: "Employees" },
    { title: "Carts", route: "Carts" },
    { title: "Clients", route: "Clients" },
    { title: "Orders", route: "Orders" },
    { title: "Products", route: "Products" },
    { title: "Promotions", route: "Promotions" },
    { title: "Notifications", route: "Notifications" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
          <Text style={styles.title}>InsertCoin</Text>
        </View>

        <TouchableOpacity style={styles.clientButton}>
          <Text style={styles.clientText}>Client</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#ccc" />
        <TextInput
          placeholder="Type to search"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
      </View>

      {/* Menu */}
      <ScrollView style={{ marginTop: 15 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)} // ajuste conforme suas rotas
          >
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color="#aaa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F24",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
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
  clientButton: {
    backgroundColor: "#1D3CFD",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  clientText: {
    color: "#fff",
    fontSize: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141B3A",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
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
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
});
