import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function ViewEditClient() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const clients = [
    { id: 1, email: "andersonbohnem@insertcoin.com.br", name: "Anderson Bohnem", isActive: true },
    { id: 2, email: "luisfelipepagnussat@insertcoin.com.br", name: "Luis Felipe Pagnussat", isActive: true },
    { id: 3, email: "guilhermeferrari@insertcoin.com.br", name: "Guilherme Ferrari", isActive: true },
    { id: 4, email: "eduardomorel@insertcoin.com.br", name: "Eduardo Morel", isActive: true },
    { id: 5, email: "cristianosalles@insertcoin.com.br", name: "Cristiano Salles", isActive: true },
    { id: 6, email: "carlossantos@insertcoin.com.br", name: "Carlos Santos", isActive: true },
    { id: 7, email: "lucassilva@insertcoin.com.br", name: "Lucas Silva", isActive: true },
    { id: 8, email: "pauloalcantra@insertcoin.com.br", name: "Paulo Alcantra", isActive: true },
    { id: 9, email: "ricardomazda@insertcoin.com.br", name: "Ricardo Mazda", isActive: true },
    { id: 10, email: "julialima@insertcoin.com.br", name: "Julia Lima", isActive: true },
  ];

  const filteredClients = clients.filter(client =>
    client.email.toLowerCase().includes(searchText.toLowerCase()) ||
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectClient = (client) => {
    navigation.navigate("EditClientForm", { client });
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

      <Text style={styles.title}>Clients</Text>

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

      <ScrollView style={styles.list}>
        {filteredClients.map((client) => (
          <TouchableOpacity
            key={client.id}
            style={styles.clientItem}
            onPress={() => handleSelectClient(client)}
          >
            <View style={styles.clientInfo}>
              <Text style={styles.clientEmail}>{client.email}</Text>
              {!client.isActive && (
                <View style={styles.inactiveBadge}>
                  <Text style={styles.inactiveBadgeText}>Inactive</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  list: {
    flex: 1,
  },
  clientItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  clientEmail: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },
  inactiveBadge: {
    backgroundColor: "#6B7280",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inactiveBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});