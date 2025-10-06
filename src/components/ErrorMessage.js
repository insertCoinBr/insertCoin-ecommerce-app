import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return <Text style={styles.errorText}>{message}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});