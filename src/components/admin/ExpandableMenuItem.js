import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ExpandableMenuItem({ title, options }) {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.expandableItem}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons
          name={isExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
          size={18}
          color="#aaa"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.subMenu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subMenuItem}
              onPress={() => navigation.navigate(option.route)}
            >
              <Text style={styles.subMenuText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  expandableItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#1B254F",
    borderBottomWidth: 1,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  subMenu: {
    backgroundColor: "#0D1429",
    borderLeftWidth: 2,
    borderLeftColor: "#A855F7",
    marginLeft: 10,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 15,
    borderBottomColor: "#1B254F",
    borderBottomWidth: 1,
  },
  subMenuText: {
    color: "#fff",
    fontSize: 15,
  },
});
