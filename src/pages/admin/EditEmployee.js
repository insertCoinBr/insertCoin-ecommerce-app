import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function EditEmployee() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  // Mock data - substitua com dados reais da sua API
  const employees = [
    { id: 1, email: "andersonbohnem@insertcoin.com.br", name: "Anderson Bohnem" },
    { id: 2, email: "luisfelipepagnussat@insertcoin.com.br", name: "Luis Felipe Pagnussat" },
    { id: 3, email: "guilhermeferrari@insertcoin.com.br", name: "Guilherme Ferrari" },
    { id: 4, email: "eduardomorel@insertcoin.com.br", name: "Eduardo Morel" },
    { id: 5, email: "cristianesalles@insertcoin.com.br", name: "Cristiane Salles" },
    { id: 6, email: "carlossantos@insertcoin.com.br", name: "Carlos Santos" },
    { id: 7, email: "lucassilva@insertcoin.com.br", name: "Lucas Silva" },
    { id: 8, email: "pauloalcantra@insertcoin.com.br", name: "Paulo Alcantra" },
    { id: 9, email: "ricardomazda@insertcoin.com.br", name: "Ricardo Mazda" },
    { id: 10, email: "juligalima@insertcoin.com.br", name: "Julia Lima" },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectEmployee = (employee) => {
    navigation.navigate("EditEmployeeForm", { employee });
  };

  return (
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
          <Ionicons name="logo-bitcoin" size={20} color="#FFD700" />
          <Text style={styles.headerTitle}>InsertCoin</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Employees</Text>

      {/* Search */}
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

      {/* Employee List */}
      <ScrollView style={styles.list}>
        {filteredEmployees.map((employee) => (
          <TouchableOpacity
            key={employee.id}
            style={styles.employeeItem}
            onPress={() => handleSelectEmployee(employee)}
          >
            <Text style={styles.employeeEmail}>{employee.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#A855F7",
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
    color: "#A855F7",
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
  employeeItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  employeeEmail: {
    color: "#fff",
    fontSize: 15,
  },
});