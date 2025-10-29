import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AdmStack from "./AdmStack";

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}