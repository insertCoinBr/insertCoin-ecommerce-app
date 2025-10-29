import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';

// COMPONENTES
import RPGBorder from './RPGBorder';

const { width } = Dimensions.get('window');

const COLORS = {
  background: "#000000ff",
  primary: "#4C38A4",
  textColor: "#ffffffff",
};

const tabs = [
  { 
    name: 'Notification', 
    label: 'Notificação',
    icon: require('../../assets/IconsPixel/bellIcon.png'),
    route: 'notifications'
  },
  { 
    name: 'Home', 
    label: 'Home',
    icon: require('../../assets/IconsPixel/houseIcon.png'),
    route: 'ProductList'
  },
  { 
    name: 'Orders', 
    label: 'Pedidos',
    icon: require('../../assets/IconsPixel/OrderIcon.png'),
    route: 'orders'
  },
  { 
    name: 'Cart', 
    label: 'Carrinho',
    icon: require('../../assets/IconsPixel/carIcon.png'),
    route: 'carts'
  },
];

function TabButton({ tab, isActive, onPress }) {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.3 : 0.8,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View style={[
        styles.iconContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <Image
          source={tab.icon}
          style={[styles.icon, isActive && styles.iconActive]}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function BottomTabBar({ activeTab, onTabPress }) {
  return (
    <View style={styles.wrapper}>
      <RPGBorder
        width={width * 0.95}
        height={101}
        borderType="black"
        centerColor={COLORS.primary}
        tileSize={16}
      >
        <View style={styles.container}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              tab={tab}
              isActive={activeTab === tab.name}
              onPress={() => onTabPress(tab.route, tab.name)}
            />
          ))}
        </View>
      </RPGBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: '4%',
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 16,
    fontFamily: 'VT323',
    color: COLORS.textColor,
    textAlign: 'center',
    marginTop: 2,
  },
  labelActive: {
    fontSize: 18,
    color: COLORS.textColor,
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    
  },
  iconActive: {
    

  },
});
