import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

const { width, height } = Dimensions.get('window');

export default function AdminLayout({
  children,
  title,
  showBackButton = true,
  scrollable = false
}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {showBackButton ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Ionicons name="chevron-back" size={20} color="#A855F7" />
                <Text style={styles.backText}>Back</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.backButton} />
          )}

          <View style={styles.headerRight}>
            <Image
              source={require("../../../assets/LogoInsetCoin1.png")}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>InsertCoin</Text>
          </View>
        </View>

        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
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
    paddingHorizontal: width * 0.05, // 5% da largura da tela
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.03, // 3% da altura
    marginTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
  },
  backText: {
    color: "#fff",
    fontSize: Math.min(width * 0.04, 16), // Responsivo mas limitado
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: Math.min(width * 0.06, 24),
    height: Math.min(width * 0.06, 24),
    marginRight: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: "bold",
    marginBottom: height * 0.025,
  },
  content: {
    flex: 1,
  },
});
