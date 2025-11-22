import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { searchEmployees, updateEmployee, getUserById } from "../../services/authService";

export default function RemoveEmployee() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Carregar employees da API
  useEffect(() => {
    loadEmployees();
  }, [page]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await searchEmployees({
        email: searchText,
        page: page,
        size: 20
      });

      // A resposta pode vir em formato paginado
      let employeeList = [];
      if (response.content) {
        employeeList = response.content;
        setTotalPages(response.totalPages || 0);
      } else if (Array.isArray(response)) {
        employeeList = response;
      }

      // Buscar detalhes completos de cada employee (incluindo campo active)
      if (employeeList.length > 0) {
        const detailedEmployees = await Promise.all(
          employeeList.map(async (emp) => {
            try {
              const fullData = await getUserById(emp.id);
              return fullData;
            } catch (error) {
              console.error('Erro ao buscar detalhes do employee:', emp.id, error);
              // Se falhar, retorna os dados básicos
              return emp;
            }
          })
        );
        setEmployees(detailedEmployees);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error loading employees:', error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to load employees'
      });
      setShowAlert(true);
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

  // Filtrar apenas employees ativos (active === true ou undefined/null)
  const filteredEmployees = employees.filter(emp => {
    // Considerar ativo se: active é true, undefined, null, ou não existe
    // Considerar inativo se: active é false ou "false" (string)
    const isActive = emp.active !== false && emp.active !== "false" && emp.active !== 0;
    return isActive;
  });

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredEmployees.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredEmployees.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      setAlertConfig({ type: 'error', message: 'Please select at least one item to delete' });
      setShowAlert(true);
      return;
    }
    setShowModal(true);
    setSelectedEmployee({ count: selectedItems.length });
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      setShowModal(false);

      if (selectedEmployee?.count) {
        // Inativar múltiplos
        const promises = selectedItems.map(id => {
          return updateEmployee(id, { active: false });
        });
        await Promise.all(promises);

        // Remover imediatamente da lista local para feedback instantâneo
        setEmployees(prev => prev.filter(emp => !selectedItems.includes(emp.id)));
        setAlertConfig({ type: 'success', message: `${selectedItems.length} employee(s) inactivated successfully` });
        setSelectedItems([]);
      } else {
        // Inativar único
        await updateEmployee(selectedEmployee.id, { active: false });

        // Remover imediatamente da lista local para feedback instantâneo
        setEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id));
        setAlertConfig({ type: 'success', message: 'Employee inactivated successfully' });
      }

      setShowAlert(true);

      // Recarregar lista do servidor em background
      loadEmployees();
    } catch (error) {
      console.error('Error inactivating employee:', error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to inactivate employee'
      });
      setShowAlert(true);

      // Em caso de erro, recarregar para garantir consistência
      loadEmployees();
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <>
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

        {selectedItems.length > 0 && (
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.selectAllButton} onPress={toggleSelectAll}>
              <Ionicons
                name={selectedItems.length === filteredEmployees.length ? "checkbox" : "square-outline"}
                size={20}
                color="#A855F7"
              />
              <Text style={styles.selectAllText}>
                {selectedItems.length === filteredEmployees.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelected}>
              <Ionicons name="trash" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Delete ({selectedItems.length})</Text>
            </TouchableOpacity>
          </View>
        )}

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
              style={styles.itemCard}
              onPress={() => toggleItemSelection(employee.id)}
            >
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleItemSelection(employee.id)}
              >
                <Ionicons
                  name={selectedItems.includes(employee.id) ? "checkbox" : "square-outline"}
                  size={24}
                  color="#A855F7"
                />
              </TouchableOpacity>

              <View style={styles.itemInfo}>
                <Text style={styles.employeeEmail}>{employee.email}</Text>
                <Text style={styles.employeeName}>{employee.name}</Text>
              </View>

              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleSelectEmployee(employee);
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          </ScrollView>
        )}
        </View>
      </SafeAreaView>

      <ConfirmModal
        visible={showModal}
        title="Confirm Deletion"
        message={
          selectedEmployee?.count
            ? `Are you sure you want to remove ${selectedEmployee.count} employees?`
            : "Are you sure you want to remove this employee?"
        }
        highlightText={selectedEmployee?.count ? null : selectedEmployee?.email}
        confirmText="Delete"
        confirmColor="#EF4444"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        message={alertConfig.message}
        onClose={() => setShowAlert(false)}
      />
    </>
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
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectAllText: {
    color: "#A855F7",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    gap: 12,
  },
  checkboxContainer: {
    padding: 5,
  },
  itemInfo: {
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
    fontWeight: "600",
  },
  employeeName: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
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