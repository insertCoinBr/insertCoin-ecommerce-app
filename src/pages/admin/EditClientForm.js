import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [points, setPoints] = useState("300");

  const validatePassword = (pass) => {
    if (!pass) return { hasUpperCase: false, hasLowerCase: false, hasNumber: false, hasSpecial: false, hasMinLength: false };
    
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasMinLength = pass.length >= 8;

    return { hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasMinLength };
  };

  const validation = validatePassword(password);

  const handleUpdateClient = () => {
    if (!fullName || !email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (password && !Object.values(validation).every(v => v)) {
      Alert.alert("Error", "Password doesn't meet requirements");
      return;
    }

    // Validar pontos
    if (points && isNaN(points)) {
      Alert.alert("Error", "Points must be a valid number");
      return;
    }

    // CORREÇÃO: Usar goBack() ou popToTop() ao invés de navigate
    Alert.alert("Success", "Client updated successfully", [
      { 
        text: "OK", 
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeAdm' }],
          });
        }
      }
    ]);
  };

  return (
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
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => navigation.navigate("ClientOrders", { client })}
        >
          <Text style={styles.ordersButtonText}>Orders of Client</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Points</Text>
        <TextInput
          style={styles.inputPoints}
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Leave blank to keep current password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Leave blank to keep current password"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Update Client"
          onPress={handleUpdateClient}
        />
      </View>
    </KeyboardAvoidingView>
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