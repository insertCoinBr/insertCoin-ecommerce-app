import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PlatformSelector({ 
  selectedPlatform, 
  onSelectPlatform,
  platforms = ["PC", "PlayStation", "Xbox", "Nintendo Switch"]
}) {
  const [showPlatforms, setShowPlatforms] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setShowPlatforms(!showPlatforms)}
      >
        <Text style={styles.selectorButtonText}>
          {selectedPlatform || "Click for Select Platform"}
        </Text>
        <Ionicons 
          name={showPlatforms ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#A855F7" 
        />
      </TouchableOpacity>

      {showPlatforms && (
        <View style={styles.optionsList}>
          {platforms.map((platform, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => {
                onSelectPlatform(platform);
                setShowPlatforms(false);
              }}
            >
              <Text style={styles.optionText}>{platform}</Text>
              {selectedPlatform === platform && (
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
    zIndex: 999,
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