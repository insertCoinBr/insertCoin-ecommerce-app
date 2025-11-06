import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function RemoveEmployee() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data - substitua com dados reais da sua API
  const [employees, setEmployees] = useState([
    { id: 1, email: "andersonbohnem@insertcoin.com.br", name: "Anderson Bohnem" },
    { id: 2, email: "luisfelipepagnussat@insertcoin.com.br", name: "Luis Felipe Pagnussat" },
    { id: 3, email: "guilhermeferrari@insertcoin.com.br", name: "Guilherme Ferrari" },
    { id: 4, email: "eduardomorel@insertcoin.com.br", name: "Eduardo Morel" },
    { id: 5, email: "cristianesalles@insertcoin.com.br", name: "Cristiane Salles" },
  ]);

  const filteredEmployees = employees.filter(emp =>
    emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.name.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const handleConfirmDelete = () => {
    if (selectedEmployee?.count) {
      // Delete multiple
      setEmployees(employees.filter(emp => !selectedItems.includes(emp.id)));
      setAlertConfig({ type: 'success', message: `${selectedItems.length} employee(s) removed successfully` });
      setSelectedItems([]);
    } else {
      // Delete single
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setAlertConfig({ type: 'success', message: 'Employee removed successfully' });
    }
    setShowModal(false);
    setShowAlert(true);
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
});