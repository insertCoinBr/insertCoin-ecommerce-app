import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

// PALETA DE CORES
const COLORS = {
  border: '#E0E0E0',
  textDark: '#212121',
  placeholder: '#9E9E9E',
  error: '#D32F2F',
  white: '#FFFFFF',
};

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error = null, 
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, 
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border, 
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    fontSize: 16,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});