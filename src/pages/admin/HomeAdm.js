import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeAdm({ route, onLogout }) {
  const navigation = useNavigation();
  const [isEmployeesExpanded, setIsEmployeesExpanded] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);  

  const employeeOptions = [
    { title: "Add Employee", route: "AddEmployee" },
    { title: "Remove Employee", route: "RemoveEmployee" },
    { title: "Edit Employee", route: "EditEmployee" },
  ];
  const cartOptions = [
    { title: "View & Remove Cart", route: "Carts" },
  ];
  const otherMenuItems = [
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

        <TouchableOpacity 
          style={styles.backButton}
          onPress={onLogout}
        >
          <Text style={styles.clientText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
            <ScrollView style={styles.scrollView}>
              {/* Employees Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsEmployeesExpanded(!isEmployeesExpanded)}
              >
                <Text style={styles.menuText}>Employees</Text>
                <Ionicons 
                  name={isEmployeesExpanded ? "chevron-down-outline" : "chevron-forward-outline"} 
                  size={18} 
                  color="#aaa" 
                />
              </TouchableOpacity>
      
              {isEmployeesExpanded && (
                <View style={styles.subMenu}>
                  {employeeOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.subMenuItem}
                      onPress={() => navigation.navigate(option.route)}
                    >
                      <Text style={styles.subMenuText}>{option.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Cart Options Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsCartExpanded(!isCartExpanded)}
              >
                <Text style={styles.menuText}>Cart Options</Text>
                <Ionicons
                  name={isCartExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
              {isCartExpanded && (
                <View style={styles.subMenu}>
                  {cartOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.subMenuItem}
                      onPress={() => navigation.navigate(option.route)}
                    >
                      <Text style={styles.subMenuText}>{option.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
      
              {/* Other Menu Items */}
              {otherMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => navigation.navigate(item.route)}
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
  scrollView: {
    marginTop: 30, 
    flex: 1,
  },
  expandableItem: {
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
  subMenu: {
    backgroundColor: "#0D1429",
    borderLeftWidth: 2,
    borderLeftColor: "#A855F7",
    marginLeft: 10,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 15,
    borderBottomColor: "#1B254F",
    borderBottomWidth: 1,
  },
  subMenuIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A855F7",
    marginRight: 12,
  },
  subMenuText: {
    color: "#fff",
    fontSize: 15,
  },
});