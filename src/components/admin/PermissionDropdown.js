import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PermissionDropdown({ 
  selectedPermission, 
  onSelectPermission,
  permissions = ["Gerente", "Super Admin"]
}) {
  const [showPermissions, setShowPermissions] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botão Principal */}
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          showPermissions && styles.dropdownButtonOpen
        ]}
        onPress={() => setShowPermissions(!showPermissions)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPermission || "Select of Permission"}
        </Text>
        <Ionicons 
          name={showPermissions ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#A855F7" 
        />
      </TouchableOpacity>

      {/* Lista de Permissões - Aparece como continuação do botão */}
      {showPermissions && (
        <View style={styles.dropdownList}>
          {permissions.map((permission, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                index === permissions.length - 1 && styles.lastItem
              ]}
              onPress={() => {
                onSelectPermission(permission);
                setShowPermissions(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{permission}</Text>
              {selectedPermission === permission && (
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
  dropdownButton: {
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
  dropdownButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: "#0D1429",
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "#A855F7",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A8A",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
  },
});
