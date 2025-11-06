import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import RPGBorder from './RPGBorder';

const { height: screenHeight } = Dimensions.get('window');

const COLORS = {
  background: '#1A1027',
  primary: '#4C38A4',
  secondary: '#1F41BB',
  success: '#6ABE30',
};

export default function FilterModal({
  visible,
  onClose,
  onSelectFilter,
  filterType, // 'Categoria' ou 'Plataforma'
  options, // Array de opções disponíveis
  selectedOption, // Opção atualmente selecionada
}) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      slideAnim.setValue(screenHeight);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const handleSelectOption = (option) => {
    onSelectFilter?.(option);
    handleClose();
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
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />

        <Animated.View
          style={[
            styles.modalWrapper,
            {
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <RPGBorder
            widthPercent={1}
            height={screenHeight * 0.6}
            tileSize={10}
            centerColor={COLORS.primary}
            borderType="black"
            contentPadding={20}
            contentJustify="flex-start"
          >
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>
                  Filtrar por {filterType}
                </Text>
                <View style={styles.titleUnderline} />
              </View>

              {/* Lista de Opções */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectOption(option)}
                    activeOpacity={0.8}
                    style={styles.optionWrapper}
                  >
                    <RPGBorder
                      widthPercent={0.85}
                      aspectRatio={0.18}
                      tileSize={8}
                      centerColor={selectedOption === option ? COLORS.success : COLORS.secondary}
                      borderType={selectedOption === option ? "green" : "blue"}
                      contentPadding={8}
                      contentJustify="center"
                      contentAlign="center"
                    >
                      <Text style={styles.optionText} numberOfLines={1}>
                        {option}
                      </Text>
                    </RPGBorder>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Botão Fechar */}
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.8}
                style={styles.closeButtonWrapper}
              >
                <RPGBorder
                  widthPercent={0.85}
                  aspectRatio={0.18}
                  tileSize={8}
                  centerColor="#FF4444"
                  borderType="red"
                  contentPadding={8}
                  contentJustify="center"
                  contentAlign="center"
                >
                  <Text style={styles.closeButtonText}>
                    FECHAR
                  </Text>
                </RPGBorder>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalWrapper: {
    width: '100%',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "VT323",
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  titleUnderline: {
    height: 3,
    width: 120,
    backgroundColor: '#6ABE30',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  optionWrapper: {
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "VT323",
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  closeButtonWrapper: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    textAlign: 'center',
  },
});
