import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ 
  placeholder = "Type to search",
  value,
  onChangeText,
  style
}) {
  return (
    <View style={[styles.searchBox, style]}>
      <Ionicons name="search-outline" size={18} color="#ccc" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141B3A",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
});