import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/auth/Login";
import CodigoDeSeguranca from "../pages/auth/CodigoDeSeguranca";
import EsqueceuSenha from "../pages/auth/EsqueceuSenha";
import CriarSenha from "../pages/auth/CriarSenha";
import CriarConta from "../pages/auth/CriarConta";

const Stack = createNativeStackNavigator();

export default function AuthStack({ onLogin, onAdminLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <Login 
            {...props} 
            onLogin={onLogin}
            onAdminLogin={onAdminLogin}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="CodigoDeSeguranca" component={CodigoDeSeguranca} />
      <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
      <Stack.Screen name="CriarSenha" component={CriarSenha} />
      <Stack.Screen name="CriarConta" component={CriarConta} />
    </Stack.Navigator>
  );
}