import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function NotificationCard({ 
  notification,
  onToggleFavorite,
  onShare,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const [isFavorite, setIsFavorite] = useState(notification.isFavorite || false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(notification.id, !isFavorite);
  };

  return (
    <View style={styles.wrapper}>
      <RPGBorder 
        width={345} 
        height={115} 
        tileSize={8} 
        centerColor={centerColor}
        borderType={borderType}
      >
        <View style={styles.container}>
          {/* Imagem do Jogo */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: notification.image }}
              style={styles.gameImage}
              resizeMode="cover"
            />
          </View>

          {/* Conteúdo */}
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {notification.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {notification.description}
            </Text>
          </View>

          {/* Ações */}
          <View style={styles.actionsContainer}>
            {/* Botão Favorito */}
            <TouchableOpacity 
              onPress={handleToggleFavorite}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Image
                source={
                  isFavorite 
                    ? require('../../../assets/IconsPixel/iconHeart.png')
                    : require('../../../assets/IconsPixel/iconHeartNull.png')
                }
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Botão Compartilhar */}
            <TouchableOpacity 
              onPress={() => onShare(notification)}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Icon name="share-variant" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </RPGBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  description: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "VT323",
    lineHeight: 16,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
});