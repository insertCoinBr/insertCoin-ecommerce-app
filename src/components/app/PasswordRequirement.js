import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function PasswordRequirement({ text, isValid }) {
  return (
    <Text style={[styles.requirement, isValid && styles.valid]}>
      {isValid ? '✓' : '○'} {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  requirement: {
    color: '#999',
    fontSize: 14,
    marginVertical: 3,
  },
  valid: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});