import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import AdminContainer from "../../components/admin/AdminContainer";
import MenuItem from "../../components/admin/MenuItem";

export default function EmployeesMenu({route}) {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const employeeOptions = [
    { title: "Add Employee", route: "AddEmployee" },
    { title: "Remove Employee", route: "RemoveEmployee" },
    { title: "Edit Employee", route: "EditEmployee" },
  ];

  return (
    <AdminContainer showSearch={false}>
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

      <MenuItem title="Carts" onPress={() => navigation.navigate("Carts")} />
      <MenuItem title="Clients" onPress={() => navigation.navigate("Clients")} />
      <MenuItem title="Orders" onPress={() => navigation.navigate("Orders")} />
      <MenuItem title="Products" onPress={() => navigation.navigate("Products")} />
      <MenuItem title="Promotions" onPress={() => navigation.navigate("Promotions")} />
      <MenuItem title="Notifications" onPress={() => navigation.navigate("Notifications")} />
    </AdminContainer>
  );
}

const styles = StyleSheet.create({
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