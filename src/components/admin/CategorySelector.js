import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mapeamento de categorias: Inglês (exibição) -> Português (API)
const CATEGORY_MAP = {
  "Action": "Ação",
  "Adventure": "Aventura",
  "RPG": "RPG",
  "Sports": "Esporte",
  "FPS": "FPS"
};

// Categorias disponíveis (em inglês para exibição)
const AVAILABLE_CATEGORIES = Object.keys(CATEGORY_MAP);

export default function CategorySelector({
  selectedCategories = [],
  onSelectCategory
}) {
  const [showCategories, setShowCategories] = useState(false);

  // Converte português para inglês para exibição
  const getDisplayCategory = (apiCategory) => {
    const entry = Object.entries(CATEGORY_MAP).find(([_, pt]) => pt === apiCategory);
    return entry ? entry[0] : apiCategory;
  };

  // Converte inglês para português para API
  const getApiCategory = (displayCategory) => {
    return CATEGORY_MAP[displayCategory] || displayCategory;
  };

  const toggleCategory = (displayCategory) => {
    const apiCategory = getApiCategory(displayCategory);

    if (selectedCategories.includes(apiCategory)) {
      onSelectCategory(selectedCategories.filter(c => c !== apiCategory));
    } else {
      onSelectCategory([...selectedCategories, apiCategory]);
    }
  };

  // Exibe categorias selecionadas em inglês
  const getDisplayedSelectedCategories = () => {
    return selectedCategories.map(apiCat => getDisplayCategory(apiCat)).join(", ");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setShowCategories(!showCategories)}
      >
        <Text style={styles.selectorButtonText}>
          {selectedCategories.length > 0
            ? getDisplayedSelectedCategories()
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
          {AVAILABLE_CATEGORIES.map((displayCategory, index) => {
            const apiCategory = getApiCategory(displayCategory);
            const isSelected = selectedCategories.includes(apiCategory);

            return (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => toggleCategory(displayCategory)}
              >
                <Text style={styles.optionText}>{displayCategory}</Text>
                {isSelected && (
                  <Ionicons name="checkmark" size={20} color="#A855F7" />
                )}
              </TouchableOpacity>
            );
          })}
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