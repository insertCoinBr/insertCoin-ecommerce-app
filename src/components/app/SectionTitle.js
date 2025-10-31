import React from 'react';
import { Text, StyleSheet } from 'react-native';

const COLORS = {
  textColors: "#FFFFFF",
};

export default function SectionTitle({ children, style }) {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textColors,
    marginBottom: 15,
    paddingHorizontal: 16,
  },
});