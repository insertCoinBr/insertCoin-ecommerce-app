import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  ...props 
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: { 
    height: 60, 
    width: '100%', 
    marginTop: 30, 
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#1F41BB',
    backgroundColor: '#F1F4FF',
  },
});