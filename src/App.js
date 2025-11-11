import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

//Import de Context
import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AlertProvider } from "./context/AlertContext";
import { RatingsProvider } from "./context/RatingsContext";

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
        <AlertProvider>
          <RatingsProvider>
            <StatusBar hidden />
            <Routes />
          </RatingsProvider>
        </AlertProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
