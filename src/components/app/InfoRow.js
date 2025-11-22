import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoRow({ label, value, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  label: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    minWidth: 100,
    marginRight: 8,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    flex: 1,
    minWidth: 0,
  },
});