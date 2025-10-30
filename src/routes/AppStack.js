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
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="carts"
        component={Carts}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="orders"
        component={Orders}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{headerShown: false}}
      />

      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name="FrequencyQuestions" 
        component={FrequencyQuestions}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="TermsOfUse" 
        component={TermsOfUse}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Success" 
        component={Success}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Payment" 
        component={Payment}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="EmptyCart" 
        component={EmptyCart}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Wishlist" 
        component={Wishlist}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="PersonalData" 
        component={PersonalData}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="ChangePassword" 
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}