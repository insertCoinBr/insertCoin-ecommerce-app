import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

//Import de Context
import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";

//Import de Rotas
import Routes from "./routes/routes";

export default function App() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  return (
    <AuthProvider>
      <CurrencyProvider>  
      <StatusBar hidden /> 
      <Routes />
      </CurrencyProvider>
    </AuthProvider>
  );
}
