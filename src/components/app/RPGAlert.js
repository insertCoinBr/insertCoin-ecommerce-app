import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import RPGBorder from './RPGBorder';

const { width: screenWidth } = Dimensions.get('window');

const ALERT_TYPES = {
  success: {
    icon: require('../../../assets/IconsPixel/iconHeart.png'),
    borderType: 'green',
    centerColor: '#6ABE30',
  },
  error: {
    icon: require('../../../assets/IconsPixel/iconAlert.png'),
    borderType: 'red',
    centerColor: '#FF4D4D',
  },
  warning: {
    icon: require('../../../assets/IconsPixel/iconAlert.png'),
    borderType: 'blue',
    centerColor: '#1F41BB',
  },
  info: {
    icon: require('../../../assets/IconsPixel/iconSearch.png'),
    borderType: 'blue',
    centerColor: '#1F41BB',
  },
};

export default function RPGAlert({
  visible,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  type = 'info', // 'success', 'error', 'warning', 'info'
  confirmText = "OK",
  cancelText = "Cancelar",
  showCancel = false,
  autoClose = false,
  autoCloseDelay = 2000,
}) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const alertConfig = ALERT_TYPES[type] || ALERT_TYPES.info;

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Animação de bounce no ícone
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 100,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        return () => clearTimeout(timer);
      }
    } else {
      // Reset animations
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      bounceAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const handleConfirm = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onConfirm?.();
    });
  };

  const handleCancelButton = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Se tem onCancel customizado, usa ele. Senão usa onClose
      if (onCancel) {
        onCancel();
      } else {
        onClose?.();
      }
    });
  };

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <Animated.View
          style={[
            styles.modalWrapper,
            {
              transform: [
                { scale: scaleAnim },
                {
                  translateY: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  })
                }
              ],
            }
          ]}
        >
          <RPGBorder
            widthPercent={0.92}
            height={autoClose ? 320 : (showCancel ? 480 : 450)}
            tileSize={10}
            centerColor="#4C38A4"
            borderType="black"
            contentPadding={20}
            contentJustify="space-around"
            contentAlign="center"
          >
            <View style={styles.modalContent}>
              {/* Decoração Superior */}
              <View style={styles.topDecoration}>
                <View style={[styles.decorLine, { backgroundColor: alertConfig.centerColor }]} />
                <View style={[styles.decorDot, { backgroundColor: alertConfig.centerColor }]} />
                <View style={[styles.decorLine, { backgroundColor: alertConfig.centerColor }]} />
              </View>

              {/* Ícone Animado */}
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [
                      {
                        scale: bounceAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, 1.3, 1],
                        })
                      },
                      {
                        rotate: bounceAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: ['0deg', '15deg', '0deg'],
                        })
                      }
                    ]
                  }
                ]}
              >
                <View style={[styles.iconBg, { backgroundColor: alertConfig.centerColor, borderColor: alertConfig.centerColor }]}>
                  <View style={styles.iconInner}>
                    <Image
                      source={alertConfig.icon}
                      style={styles.alertIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Animated.View>

              {/* Título */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={[styles.titleUnderline, { backgroundColor: alertConfig.centerColor }]} />
              </View>

              {/* Mensagem */}
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
              </View>

              {/* Botões - Só mostra se não for auto-close */}
              {!autoClose && (
                <View style={styles.buttonContainer}>
                  {showCancel && (
                    <TouchableOpacity
                      onPress={handleCancelButton}
                      activeOpacity={0.8}
                    >
                      <RPGBorder
                        width={135}
                        height={70}
                        tileSize={8}
                        centerColor="#1F41BB"
                        borderType="blue"
                        contentPadding={8}
                        contentJustify="center"
                        contentAlign="center"
                      >
                        <View style={styles.button}>
                          <Text style={styles.buttonText} numberOfLines={2}>{cancelText}</Text>
                        </View>
                      </RPGBorder>
                    </TouchableOpacity>
                  )}

                  {/* Botão Confirmar */}
                  <TouchableOpacity
                    onPress={handleConfirm}
                    activeOpacity={0.8}
                  >
                    <RPGBorder
                      width={showCancel ? 135 : 280}
                      height={70}
                      tileSize={8}
                      centerColor={alertConfig.centerColor}
                      borderType={alertConfig.borderType}
                      contentPadding={8}
                      contentJustify="center"
                      contentAlign="center"
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText} numberOfLines={2}>{confirmText}</Text>
                      </View>
                    </RPGBorder>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </RPGBorder>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
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
    width: '100%',
  },
  topDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 8,
    gap: 8,
  },
  decorLine: {
    height: 2,
    width: 60,
  },
  decorDot: {
    width: 8,
    height: 8,
  },
  iconContainer: {
    marginVertical: 8,
  },
  iconBg: {
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  iconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  alertIcon: {
    width: 55,
    height: 55,
  },
  titleContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "VT323",
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
  titleUnderline: {
    height: 3,
    width: 80,
    marginTop: 6,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 70,
    flex: 1,
  },
  message: {
    color: "#E0E0E0",
    fontSize: 19,
    fontFamily: "VT323",
    textAlign: 'center',
    lineHeight: 24,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 20,
  },
});
