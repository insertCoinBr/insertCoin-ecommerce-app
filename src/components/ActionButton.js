import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ActionButton({ 
  iconName, 
  label, 
  onPress,
  backgroundColor = "#007BFF",
  iconColor = "#ffffff",
  textColor = "#ffffff",
  iconSize = 18,
  style
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: "VT323",
    textAlign: "center",
    flex: 1,
  },
});