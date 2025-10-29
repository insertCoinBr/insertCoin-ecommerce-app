import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EmployeesMenu() {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const employeeOptions = [
    { title: "Add Employee", route: "AddEmployee" },
    { title: "Remove Employee", route: "RemoveEmployee" },
    { title: "Edit Employee", route: "EditEmployee" },
  ];

  const otherMenuItems = [
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
      <Text style={styles.title}>Admin Menu</Text>

      {/* Menu */}
      <ScrollView style={styles.scrollView}>
        {/* Employees Expandable */}
        <TouchableOpacity 
          style={styles.expandableItem}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.menuText}>Employees</Text>
          <Ionicons 
            name={isExpanded ? "chevron-down-outline" : "chevron-forward-outline"} 
            size={18} 
            color="#aaa" 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.subMenu}>
            {employeeOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subMenuItem}
                onPress={() => navigation.navigate(option.route)}
              >
                <View style={styles.subMenuIndicator} />
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
  logo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    color: "#A855F7",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
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