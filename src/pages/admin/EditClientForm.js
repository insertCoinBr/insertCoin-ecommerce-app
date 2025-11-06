import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";

export default function EditClientForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params;

  const [fullName, setFullName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [points, setPoints] = useState("300");
  const [isActive, setIsActive] = useState(client.isActive !== undefined ? client.isActive : true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '', onClose: null });

  const showAlert = (type, message, onClose = null) => {
    setAlertConfig({ type, message, onClose });
    setShowAlertModal(true);
  };

  const closeAlert = () => {
    setShowAlertModal(false);
    if (alertConfig.onClose) {
      alertConfig.onClose();
    }
  };

  const handleStatusChange = () => {
    const newStatus = !isActive;
    setPendingStatus(newStatus);
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = () => {
    setIsActive(pendingStatus);
    setShowStatusModal(false);
    showAlert('success', `Client ${pendingStatus ? 'activated' : 'inactivated'} successfully`);
  };

  const handleCancelStatusChange = () => {
    setShowStatusModal(false);
    setPendingStatus(null);
  };

  const handleUpdateClient = () => {
    if (!fullName || !email) {
      showAlert('error', 'Please fill all required fields');
      return;
    }

    // Validar pontos
    if (points && isNaN(points)) {
      showAlert('error', 'Points must be a valid number');
      return;
    }

    showAlert('success', 'Client updated successfully', () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeAdm' }],
      });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#A855F7" />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>InsertCoin</Text>
        </View>
      </View>

      <Text style={styles.title}>Clients</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, styles.inputReadOnly]}
          value={email}
          editable={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => navigation.navigate("ClientOrders", { client })}
        >
          <Text style={styles.ordersButtonText}>Orders of Client</Text>
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.label}>Client Status</Text>
          <TouchableOpacity
            style={[styles.statusButton, isActive ? styles.statusActive : styles.statusInactive]}
            onPress={handleStatusChange}
          >
            <Text style={styles.statusButtonText}>
              {isActive ? "Active" : "Inactive"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Points</Text>
        <TextInput
          style={styles.inputPoints}
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#666"
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Update Client"
          onPress={handleUpdateClient}
        />
      </View>

      <Modal
        visible={showStatusModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelStatusChange}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Status Change</Text>
            <Text style={styles.modalText}>
              Are you sure you want to {pendingStatus ? 'activate' : 'inactivate'} this client?
            </Text>
            <Text style={styles.modalClient}>{email}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelStatusChange}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, pendingStatus ? styles.activateButton : styles.inactivateButton]}
                onPress={handleConfirmStatusChange}
              >
                <Text style={styles.confirmButtonText}>
                  {pendingStatus ? 'Activate' : 'Inactivate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAlertModal}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.alertIconContainer, alertConfig.type === 'error' ? styles.errorIcon : styles.successIcon]}>
              <Ionicons
                name={alertConfig.type === 'error' ? 'close-circle' : 'checkmark-circle'}
                size={50}
                color="#fff"
              />
            </View>
            <Text style={styles.modalTitle}>
              {alertConfig.type === 'error' ? 'Error' : 'Success'}
            </Text>
            <Text style={styles.modalText}>{alertConfig.message}</Text>

            <TouchableOpacity
              style={[styles.alertButton, alertConfig.type === 'error' ? styles.errorButton : styles.successButton]}
              onPress={closeAlert}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#ffffffff",
    fontSize: 16,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    color: "#ffffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formScroll: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  inputReadOnly: {
    backgroundColor: "#1B254F",
    opacity: 0.6,
  },
  inputPoints: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#A855F7",
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#A855F7",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  ordersButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  ordersButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  statusActive: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  statusInactive: {
    backgroundColor: "#6B7280",
    borderColor: "#6B7280",
  },
  statusButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "#1B254F",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
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
    marginBottom: 8,
    textAlign: "center",
  },
  modalClient: {
    color: "#A855F7",
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  activateButton: {
    backgroundColor: "#22C55E",
  },
  inactivateButton: {
    backgroundColor: "#F59E0B",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  alertIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  errorIcon: {
    color: "#EF4444",
  },
  successIcon: {
    color: "#22C55E",
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