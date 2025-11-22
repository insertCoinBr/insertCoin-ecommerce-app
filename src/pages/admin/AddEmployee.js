import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PermissionDropdown from "../../components/admin/PermissionDropdown";
import PrimaryButton from "../../components/admin/PrimaryButton";
import CustomAlert from "../../components/admin/CustomAlert";
import { adminSignup } from "../../services/authService";

export default function AddEmployee() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasMinLength = pass.length >= 8;

    return { hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasMinLength };
  };

  const validation = validatePassword(password);

  const handleCreateEmployee = async () => {
    if (!fullName || !email || !password || !confirmPassword || !selectedPermission) {
      setAlertConfig({ type: 'error', message: 'Please fill all fields' });
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertConfig({ type: 'error', message: "Passwords don't match" });
      setShowAlert(true);
      return;
    }

    if (!Object.values(validation).every(v => v)) {
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
      await adminSignup({
        name: fullName,
        email: email,
        password: password,
        role: role
      });

      setAlertConfig({ type: 'success', message: 'Employee created successfully' });
      setShowAlert(true);

      // Limpar formulário
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelectedPermission("");
    } catch (error) {
      console.error('Error creating employee:', error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to create employee. Please try again.'
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
      <Text style={styles.title}>Add Employee</Text>

      {/* Form - ScrollView */}
      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
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

        <PermissionDropdown
          selectedPermission={selectedPermission}
          onSelectPermission={setSelectedPermission}
          permissions={["COMMERCIAL", "MANAGER_STORE"]}
        />
      </ScrollView>

      {/* Botão fixo no final */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={loading ? "Creating..." : "Create Employee"}
          onPress={handleCreateEmployee}
          disabled={loading}
        />
      </View>

        <CustomAlert
          visible={showAlert}
          type={alertConfig.type}
          message={alertConfig.message}
          onClose={handleAlertClose}
        />
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
    color: "#ffffffff",
    fontSize: 12,
    marginBottom: 4,
  },
  valid: {
    color: "#22C55E",
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
});