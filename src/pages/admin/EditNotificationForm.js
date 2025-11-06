import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import SwitchButton from "../../components/admin/SwitchButton";
import { NotificationStorage } from "../../services/NotificationStorage";
import CustomAlert from "../../components/admin/CustomAlert";

export default function EditNotificationForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { notification } = route.params;
  
  const [notificationType, setNotificationType] = useState(notification.type || "New Notification");
  const [title, setTitle] = useState(notification.title);
  const [subtitle, setSubtitle] = useState(notification.description);
  const [image, setImage] = useState(notification.image);
  const [selectedPromotion, setSelectedPromotion] = useState(
    notification.promotionId ? { id: notification.promotionId } : null
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });

  useEffect(() => {
    if (route.params?.selectedPromotion) {
      const promo = route.params.selectedPromotion;
      setSelectedPromotion(promo);
      setTitle(promo.title);
      setSubtitle(promo.subtitle);
    }
  }, [route.params?.selectedPromotion]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      setAlertConfig({ type: 'error', message: 'We need camera roll permissions to select an image.' });
      setShowAlert(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNotificationTypeChange = (type) => {
    setNotificationType(type);
    if (type === "New Notification") {
      setSelectedPromotion(null);
    }
  };

  const handleUpdateNotification = async () => {
    if (!title || !subtitle || !image) {
      setAlertConfig({ type: 'error', message: 'Please fill all fields and select an image' });
      setShowAlert(true);
      return;
    }

    try {
      const updatedNotification = {
        title,
        description: subtitle,
        image,
        type: notificationType,
        promotionId: selectedPromotion?.id || null,
      };

      await NotificationStorage.update(notification.id, updatedNotification);

      setAlertConfig({ type: 'success', message: 'Notification updated successfully' });
      setShowAlert(true);
    } catch (error) {
      setAlertConfig({ type: 'error', message: 'Failed to update notification' });
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeAdm' }],
      });
    }
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

      <Text style={styles.title}>Edit Notification</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <SwitchButton
          option1="New Notification"
          option2="Existing Promotion"
          selected={notificationType}
          onSelect={handleNotificationTypeChange}
        />

        {notificationType === "Existing Promotion" && (
          <TouchableOpacity
            style={styles.selectPromotionButton}
            onPress={() => navigation.navigate("SelectPromotion", { returnRoute: "EditNotificationForm" })}
          >
            <Text style={styles.selectPromotionButtonText}>
              {selectedPromotion ? title : "Select Promotion"}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#A855F7" />
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter notification title"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Subtitle</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={subtitle}
          onChangeText={setSubtitle}
          placeholder="Enter notification subtitle"
          placeholderTextColor="#666"
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.notificationImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#A855F7" />
              <Text style={styles.imagePickerText}>
                Click to select an image{'\n'}
                PNG, JPG (16:9 ratio recommended)
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Update Notification"
          onPress={handleUpdateNotification}
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
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  selectPromotionButton: {
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
  selectPromotionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#A855F7",
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    minHeight: 150,
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imagePickerText: {
    color: "#A855F7",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  notificationImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
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