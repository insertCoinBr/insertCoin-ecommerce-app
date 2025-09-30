import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AuthStack onLogin={() => setIsLoggedIn(true)} />
      )}

      
    </NavigationContainer>
  );
}
