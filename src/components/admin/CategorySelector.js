import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategorySelector({ 
  selectedCategories = [], 
  onSelectCategory,
  categories = ["Action", "Adventure", "RPG", "Sports", "Strategy", "Simulation"]
}) {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onSelectCategory(selectedCategories.filter(c => c !== category));
    } else {
      onSelectCategory([...selectedCategories, category]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setShowCategories(!showCategories)}
      >
        <Text style={styles.selectorButtonText}>
          {selectedCategories.length > 0 
            ? selectedCategories.join(", ") 
            : "Click for Select Category"}
        </Text>
        <Ionicons 
          name={showCategories ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#A855F7" 
        />
      </TouchableOpacity>

      {showCategories && (
        <View style={styles.optionsList}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.optionText}>{category}</Text>
              {selectedCategories.includes(category) && (
                <Ionicons name="checkmark" size={20} color="#A855F7" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    zIndex: 1000,
  },
  selectorButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorButtonText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  optionsList: {
    backgroundColor: "#0D1429",
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "#A855F7",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A8A",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});