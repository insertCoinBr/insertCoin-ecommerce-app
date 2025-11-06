import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomAlert({ visible, type = "error", title, message, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.alertIconContainer}>
            <Ionicons
              name={type === 'error' ? 'close-circle' : 'checkmark-circle'}
              size={50}
              color={type === 'error' ? '#EF4444' : '#22C55E'}
            />
          </View>
          <Text style={styles.modalTitle}>
            {title || (type === 'error' ? 'Error' : 'Success')}
          </Text>
          <Text style={styles.modalText}>{message}</Text>

          <TouchableOpacity
            style={[styles.alertButton, type === 'error' ? styles.errorButton : styles.successButton]}
            onPress={onClose}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "#141B3A",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  alertIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  alertButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  errorButton: {
    backgroundColor: "#EF4444",
  },
  successButton: {
    backgroundColor: "#22C55E",
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
