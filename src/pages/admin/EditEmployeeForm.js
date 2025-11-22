import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PermissionDropdown from "../../components/admin/PermissionDropdown";
import PrimaryButton from "../../components/admin/PrimaryButton";
import CustomAlert from "../../components/admin/CustomAlert";
import { updateEmployee } from "../../services/authService";

export default function EditEmployeeForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params;

  // Mapear role da API para permissão do dropdown
  const getInitialPermission = () => {
    const currentRole = employee.roles && employee.roles.length > 0
      ? employee.roles[0].replace('ROLE_', '')
      : null;

    const reverseRoleMap = {
      "COMMERCIAL": "COMMERCIAL",
      "MANAGER_STORE": "MANAGER_STORE"
    };

    return reverseRoleMap[currentRole] || "COMMERCIAL";
  };

  const [fullName, setFullName] = useState(employee.name || "");
  const [email, setEmail] = useState(employee.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPermission, setSelectedPermission] = useState(getInitialPermission());
  const [showPermissions, setShowPermissions] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(employee.active !== false);

  const permissions = ["COMMERCIAL", "MANAGER_STORE"];

  const validatePassword = (pass) => {
    if (!pass) return { hasUpperCase: true, hasLowerCase: true, hasNumber: true, hasSpecial: true, hasMinLength: true };

    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasMinLength = pass.length >= 8;

    return { hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasMinLength };
  };

  const validation = validatePassword(password);

  const handleUpdateEmployee = async () => {
    if (!fullName || !selectedPermission) {
      setAlertConfig({ type: 'error', message: 'Please fill all required fields' });
      setShowAlert(true);
      return;
    }

    if (password && password !== confirmPassword) {
      setAlertConfig({ type: 'error', message: "Passwords don't match" });
      setShowAlert(true);
      return;
    }

    if (password && !Object.values(validation).every(v=> v)) {
      setAlertConfig({ type: 'error', message: "Password doesn't meet requirements" });
      setShowAlert(true);
      return;
    }

    // Permissão selecionada já está no formato da API
    const role = selectedPermission;
    if (!role || (role !== "COMMERCIAL" && role !== "MANAGER_STORE")) {
      setAlertConfig({ type: 'error', message: 'Invalid permission selected' });
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      // Montar updateData apenas com campos que mudaram
      const updateData = {};

      // Verificar se nome mudou
      if (fullName !== employee.name) {
        updateData.name = fullName;
      }

      // Verificar se role mudou (comparar com primeira role do employee)
      const currentRole = employee.roles && employee.roles.length > 0
        ? employee.roles[0].replace('ROLE_', '')
        : null;
      if (role !== currentRole) {
        updateData.role = role;
      }

      // Verificar se status ativo mudou
      if (isActive !== (employee.active !== false)) {
        updateData.active = isActive;
      }

      // Incluir password se foi preenchido
      if (password) {
        updateData.password = password;
      }

      // Se não houver nada para atualizar
      if (Object.keys(updateData).length === 0) {
        setAlertConfig({ type: 'info', message: 'No changes to update' });
        setShowAlert(true);
        setLoading(false);
        return;
      }

      await updateEmployee(employee.id, updateData);

      setAlertConfig({ type: 'success', message: 'Employee updated successfully' });
      setShowAlert(true);
    } catch (error) {
      console.error('Error updating employee:', error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to update employee. Please try again.'
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.navigate("HomeAdm");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
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

      {/* Title */}
      <Text style={styles.title}>Employee</Text>

      {/* Form */}
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={email}
          editable={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Leave blank to keep current password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Leave blank to keep current password"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Password Requirements - Only show if password field has content */}
        {password.length > 0 && (
          <View style={styles.requirements}>
            <Text style={[styles.requirement, validation.hasMinLength && styles.valid]}>
              Minimum of 8 characters
            </Text>
            <Text style={[styles.requirement, validation.hasUpperCase && styles.valid]}>
              At least 1 uppercase letter
            </Text>
            <Text style={[styles.requirement, validation.hasLowerCase && styles.valid]}>
              At least 1 lowercase letter
            </Text>
            <Text style={[styles.requirement, validation.hasNumber && styles.valid]}>
              At least 1 number
            </Text>
            <Text style={[styles.requirement, validation.hasSpecial && styles.valid]}>
              At least 1 special character
            </Text>
          </View>
        )}

        <PermissionDropdown
  selectedPermission={selectedPermission}
  onSelectPermission={setSelectedPermission}
  permissions={permissions}
/>

        {/* Status */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Status:</Text>
          <View style={styles.switchRow}>
            <Text style={[styles.statusText, !isActive && styles.statusTextActive]}>
              Inactive
            </Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: "#767577", true: "#A855F7" }}
              thumbColor={isActive ? "#fff" : "#f4f3f4"}
              style={styles.switch}
            />
            <Text style={[styles.statusText, isActive && styles.statusTextActive]}>
              Active
            </Text>
          </View>
        </View>

        {/* Update Button */}
        <PrimaryButton
          title={loading ? "Updating..." : "Update Employee"}
          onPress={handleUpdateEmployee}
          disabled={loading}
        />
      </ScrollView>

        <CustomAlert
          visible={showAlert}
          type={alertConfig.type}
          message={alertConfig.message}
          onClose={handleAlertClose}
        />
      </View>
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
    marginBottom: 30,
  },
  form: {
    flex: 1,
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
  inputDisabled: {
    backgroundColor: "#1B254F",
    color: "#999",
    opacity: 0.7,
  },
  requirements: {
    marginBottom: 20,
  },
  requirement: {
    color: "#A855F7",
    fontSize: 12,
    marginBottom: 4,
  },
  valid: {
    color: "#22C55E",
  },
  permissionButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  permissionList: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    marginBottom: 15,
  },
  permissionItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A8A",
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  statusTextActive: {
    color: "#A855F7",
  },
  switch: {
    marginHorizontal: 5,
  },
});
