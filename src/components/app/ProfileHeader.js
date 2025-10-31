import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function ProfileHeader({ 
  userName,
  userEmail,
  userAvatar,
  coins = 0,
  borderType = "black",
  centerColor = "#4C38A4"
}) {
  return (
    <View style={styles.wrapper}>
      <RPGBorder 
        width={340} 
        height={140} 
        tileSize={10} 
        centerColor={centerColor}
        borderType={borderType}
      >
        <View style={styles.container}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="account" size={40} color="#FFFFFF" />
              </View>
            )}
          </View>

          {/* Informações do Usuário */}
          <View style={styles.infoContainer}>
            <Text style={styles.userName} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {userEmail}
            </Text>
            
            {/* Coins */}
            <View style={styles.coinsContainer}>
              <Icon name="circle-multiple" size={20} color="#FFD700" />
              <Text style={styles.coinsText}>Coins x{coins.toString().padStart(3, '0')}</Text>
            </View>
          </View>
        </View>
      </RPGBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 8,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coinsText: {
    color: "#FFD700",
    fontSize: 18,
    fontFamily: "VT323",
    fontWeight: "bold",
  },
});