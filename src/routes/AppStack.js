import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ProductList from "../pages/app/ProductList";
import ProductDetail from "../pages/app/ProductDetail";
import ListIntegrantes from "../pages/app/ListIntegrantes";

const Stack = createNativeStackNavigator();

const colorHeaderIcons = { color: "#fff" };

export default function AppStack({ onLogout }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={({ navigation }) => ({
          headerTitle: "Produtos",
          headerTintColor: colorHeaderIcons.color,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#4C38A4",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => onLogout()}>
              <MaterialIcons name="logout" size={24} color={colorHeaderIcons.color} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("ListIntegrantes")}>
              <MaterialIcons name="info-outline" size={24} color={colorHeaderIcons.color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: "Detalhes do Produto",
          headerStyle: { backgroundColor: "#4C38A4" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ListIntegrantes"
        component={ListIntegrantes}
        options={{
          title: "Informações do Grupo",
          headerStyle: { backgroundColor: "#4C38A4" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
