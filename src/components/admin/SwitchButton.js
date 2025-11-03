import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SwitchButton({ option1, option2, selected, onSelect }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.leftButton,
          selected === option1 && styles.activeButton
        ]}
        onPress={() => onSelect(option1)}
      >
        <Text style={[
          styles.buttonText,
          selected === option1 && styles.activeText
        ]}>
          {option1}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          styles.rightButton,
          selected === option2 && styles.activeButton
        ]}
        onPress={() => onSelect(option2)}
      >
        <Text style={[
          styles.buttonText,
          selected === option2 && styles.activeText
        ]}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#A855F7",
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 1,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 1,
  },
  activeButton: {
    backgroundColor: "#A855F7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});