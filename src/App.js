import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes/routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
