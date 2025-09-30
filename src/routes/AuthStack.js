import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/auth/Login";
import EsqueceuSenha from "src/pages/auth/EsqueceuSenha.js";
import CodigoDeSeguranca from "../pages/auth/CodigoDeSeguranca";
import CriarSenha from "../pages/auth/CriarSenha";
import Register from "../pages/auth/Register"; 

const Stack = createNativeStackNavigator();

export default function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="EsqueceuSenha" >
      {(props) => <EsqueceuSenha {...props} ForgotPassword={ForgotPassword} />}
       </Stack.Screen>
      <Stack.Screen name="CodigoDeSeguranca" component={CodigoDeSeguranca} />
      <Stack.Screen name="CriarSenha" component={CriarSenha} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
