import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductList from "../pages/app/ProductList";
import ProductDetail from "../pages/app/ProductDetail";
import ListIntegrantes from "../pages/app/ListIntegrantes";

const Stack = createNativeStackNavigator();

export default function AppStack({ onLogout }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        options={{
          headerShown: false  // Remove o header da tela de produtos
        }}
      >
        {(props) => <ProductList {...props} onLogout={onLogout} />}
      </Stack.Screen>

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