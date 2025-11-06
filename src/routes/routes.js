import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AdmStack from "./AdmStack";

//  IMPORTAR OS PROVIDERS
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <NavigationContainer>
      {/*ENVOLVER TUDO COM OS PROVIDERS */}
      <CartProvider>
        <FavoritesProvider>
          {isLoggedIn ? (
            <AppStack onLogout={() => setIsLoggedIn(false)} />
          ) : isAdmin ? (
            <AdmStack onLogout={() => setIsAdmin(false)} />
          ) : (
            <AuthStack 
              onLogin={() => setIsLoggedIn(true)} 
              onAdminLogin={() => setIsAdmin(true)}
            />
          )}
        </FavoritesProvider>
      </CartProvider>
    </NavigationContainer>
  );
}