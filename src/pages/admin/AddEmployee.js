import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function AddEmployee() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [showPermissions, setShowPermissions] = useState(false);

  const permissions = ["Gerente", "Super Admin"];

  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasMinLength = pass.length >= 8;

    return { hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasMinLength };
  };

  const validation = validatePassword(password);

  const handleCreateEmployee = () => {
    if (!fullName || !email || !password || !confirmPassword || !selectedPermission) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (!Object.values(validation).every(v => v)) {
      Alert.alert("Error", "Password doesn't meet requirements");
      return;
    }

    // Aqui você faria a chamada à API para criar o funcionário
    Alert.alert("Success", "Employee created successfully", [
      { text: "OK", onPress: () => navigation.goBack() }
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
      <Text style={styles.title}>Add Employee</Text>

      {/* Form */}
      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Password Requirements */}
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

        {/* Create Button */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateEmployee}
        >
          <Text style={styles.createButtonText}>Create Employee</Text>
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
  createButton: {
    backgroundColor: "#A855F7",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});