import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

// PALETA DE CORES
const COLORS = {
  primary: '#4C38A4',
  white: '#FFFFFF',
};

export default function ButtonPrimary({ title, onPress, disabled = false, loading = false }) {
  return (
    <TouchableOpacity 
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
    elevation: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});