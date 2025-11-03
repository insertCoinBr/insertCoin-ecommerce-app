import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeAdm({ route, onLogout }) {
  const navigation = useNavigation();
  const [isEmployeesExpanded, setIsEmployeesExpanded] = useState(false);
  const [isOrderExpanded, setIsOrderExpanded] = useState(false);
  const [isClientsExpanded, setIsClientsExpanded] = useState(false);
  const [isProductExpanded, setIsProductExpanded] = useState(false);
  const [isPromotionExpanded, setIsPromotionExpanded] = useState(false);   

  const employeeOptions = [
    { title: "Add Employee", route: "AddEmployee" },
    { title: "Remove Employee", route: "RemoveEmployee" },
    { title: "View & Edit Employee", route: "EditEmployee" },
  ];
  const OrderOptions = [
    { title: "View & Cancel Order", route: "Order" },
  ];
  const ClientsOptions = [
    { title: "Add Client", route: "AddClient" },
    { title: "Remove Client", route: "RemoveClient" },
    { title: "View & Edit Client", route: "ViewEditClient" },
  ];
  const ProductOptions = [
    { title: "Add Product", route: "AddProduct" },
    { title: "Remove Product", route: "RemoveProduct" },
    { title: "View & Edit Product", route: "ViewEditProduct" },
  ];
  const PromotionOptions = [
    { title: "Add Promotion", route: "AddPromotion" },
    { title: "Remove Promotion", route: "RemovePromotion" },
    { title: "View & Edit Promotion", route: "ViewEditPromotion" },
  ];
  const otherMenuItems = [
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

              {/* Order Options Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsOrderExpanded(!isOrderExpanded)}
              >
                <Text style={styles.menuText}>Orders</Text>
                <Ionicons
                  name={isOrderExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
              {isOrderExpanded && (
                <View style={styles.subMenu}>
                  {OrderOptions.map((option, index) => (
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

              {/* Clients Options Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsClientsExpanded(!isClientsExpanded)}
              >
                <Text style={styles.menuText}>Clients</Text>
                <Ionicons
                  name={isClientsExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
              {isClientsExpanded && (
                <View style={styles.subMenu}>
                  {ClientsOptions.map((option, index) => (
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

              {/* Product Options Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsProductExpanded(!isProductExpanded)}
              >
                <Text style={styles.menuText}>Products</Text>
                <Ionicons
                  name={isProductExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
              {isProductExpanded && (
                <View style={styles.subMenu}>
                  {ProductOptions.map((option, index) => (
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

              {/* Promotions Options Expandable */}
              <TouchableOpacity 
                style={styles.expandableItem}
                onPress={() => setIsPromotionExpanded(!isPromotionExpanded)}
              >
                <Text style={styles.menuText}>Promotion</Text>
                <Ionicons
                  name={isPromotionExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
              {isPromotionExpanded && (
                <View style={styles.subMenu}>
                  {PromotionOptions.map((option, index) => (
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