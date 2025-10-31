import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function PixelText({ 
  children, 
  size = 16,
  color = "#FFFFFF",
  style,
  ...props 
}) {
  return (
    <Text 
      style={[styles.text, { fontSize: size, color }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "VT323",
  },
});