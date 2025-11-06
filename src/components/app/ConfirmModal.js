import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RPGBorder from './RPGBorder';

export default function ConfirmModal({ 
  visible, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  borderTypeButton1,
  centerColorButton1,
  borderTypeButton2,
  centerColorButton2
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <RPGBorder
            widthPercent={0.83}
            aspectRatio={0.95}
            tileSize={8}
            centerColor="#4C38A4"
            borderType="black"
            contentPadding={12}
            contentJustify="space-between"
            contentAlign="center"
          >
            <View style={styles.modalContent}>
              {/* Ícone de Alerta Fixo */}
              <View style={styles.iconContainer}>
                <Image 
                  source={require("../../../assets/IconsPixel/iconAlert.png")} 
                  style={styles.alertIcon}
                  resizeMode="contain"
                />
              </View>

              {/* Título */}
              <Text style={styles.title}>{title}</Text>

              {/* Mensagem */}
              <Text style={styles.message}>{message}</Text>

              {/* Botões */}
              <View style={styles.buttonContainer}>
                {/* Botão Cancelar */}
                <TouchableOpacity 
                  onPress={onClose}
                  style={styles.buttonWrapper}
                  activeOpacity={0.8}
                >
                  <RPGBorder
                    widthPercent={0.35}
                    aspectRatio={0.45}
                    tileSize={8}
                    centerColor={centerColorButton1}
                    borderType={borderTypeButton1}
                    contentPadding={8}
                    contentJustify="center"
                    contentAlign="center"
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>{cancelText}</Text>
                    </View>
                  </RPGBorder>
                </TouchableOpacity>

                {/* Botão Confirmar */}
                <TouchableOpacity 
                  onPress={onConfirm}
                  style={styles.buttonWrapper}
                  activeOpacity={0.8}
                >
                  <RPGBorder
                    widthPercent={0.35}
                    aspectRatio={0.45}
                    tileSize={8}
                    centerColor={centerColorButton2}
                    borderType={borderTypeButton2}
                    contentPadding={8}
                    contentJustify="center"
                    contentAlign="center"
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>{confirmText}</Text>
                    </View>
                  </RPGBorder>
                </TouchableOpacity>
              </View>
            </View>
          </RPGBorder>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginTop: 4,
  },
  alertIcon: {
    width: 90,
    height: 90,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  message: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    textAlign: 'center',
  },
});