import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
}
