import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function EditEmployeeForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params;

  const [fullName, setFullName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("Gerente"); // Mock - buscar da API
  const [showPermissions, setShowPermissions] = useState(false);

  const permissions = ["Gerente", "Super Admin"];

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

  const handleUpdateEmployee = () => {
    if (!fullName || !email || !selectedPermission) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (password && !Object.values(validation).every(v=> v)) {
      Alert.alert("Error", "Password doesn't meet requirements");
      return;
    }

    // Aqui você faria a chamada à API para atualizar o funcionário
    Alert.alert("Success", "Employee updated successfully", [
      { text: "OK", onPress: () => navigation.navigate("EmployeesMenu") }
    ]);
  };

  return (
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
          <Ionicons name="logo-bitcoin" size={20} color="#FFD700" />
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
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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

        {/* Permission Selector */}
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => setShowPermissions(!showPermissions)}
        >
          <Text style={styles.permissionButtonText}>
            {selectedPermission || "Select of Permission"}
          </Text>
          <Ionicons 
            name={showPermissions ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#A855F7" 
          />
        </TouchableOpacity>

        {showPermissions && (
          <View style={styles.permissionList}>
            {permissions.map((permission, index) => (
              <TouchableOpacity
                key={index}
                style={styles.permissionItem}
                onPress={() => {
                  setSelectedPermission(permission);
                  setShowPermissions(false);
                }}
              >
                <Text style={styles.permissionText}>{permission}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Update Button */}
        <TouchableOpacity 
          style={styles.updateButton}
          onPress={handleUpdateEmployee}
        >
          <Text style={styles.updateButtonText}>Update Employee</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#A855F7",
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
    color: "#A855F7",
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
  updateButton: {
    backgroundColor: "#A855F7",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});