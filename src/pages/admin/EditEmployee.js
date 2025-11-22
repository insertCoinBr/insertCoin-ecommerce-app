import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import { searchEmployees, getUserById } from "../../services/authService";

export default function EditEmployee() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar employees da API
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await searchEmployees({
        email: searchText,
        page: 0,
        size: 20
      });

      // A resposta pode vir em formato paginado
      if (response.content) {
        setEmployees(response.content);
      } else if (Array.isArray(response)) {
        setEmployees(response);
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recarregar quando buscar
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadEmployees();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  // Filtrar apenas employees ativos
  const filteredEmployees = employees.filter(emp => {
    return emp.active !== false && emp.active !== "false" && emp.active !== 0;
  });

  const handleSelectEmployee = async (employee) => {
    try {
      setLoading(true);
      // Buscar dados completos do employee (incluindo active, roles, etc)
      const fullEmployeeData = await getUserById(employee.id);
      navigation.navigate("EditEmployeeForm", { employee: fullEmployeeData });
    } catch (error) {
      console.error('Error loading employee details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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
          <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
        </View>
      ) : (
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
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});