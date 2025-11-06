import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";

export default function SelectSpecificGames() {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState("");
  const initialGames = route.params?.selectedGames || [];
  const [selectedGames, setSelectedGames] = useState(initialGames);
  const [expandedGame, setExpandedGame] = useState(null);
  const returnRoute = route.params?.returnRoute || "AddPromotion";
  const promotion = route.params?.promotion;

  const games = [
    { id: 1, name: "Red Dead Redemption 2", platforms: ["PC", "PlayStation", "Xbox"] },
    { id: 2, name: "GTA V", platforms: ["PC", "PlayStation", "Xbox"] },
    { id: 3, name: "Fortnite", platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"] },
    { id: 4, name: "FIFA 24", platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"] },
    { id: 5, name: "Forza Horizon 5", platforms: ["PC", "Xbox"] },
    { id: 6, name: "Mario Kart 8 Deluxe", platforms: ["Nintendo Switch"] },
  ];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleGameExpansion = (gameId) => {
    setExpandedGame(expandedGame === gameId ? null : gameId);
  };

  const togglePlatform = (gameId, gameName, platform) => {
    const key = `${gameId}-${platform}`;
    const existingIndex = selectedGames.findIndex(sg => sg.key === key);

    if (existingIndex > -1) {
      setSelectedGames(selectedGames.filter(sg => sg.key !== key));
    } else {
      setSelectedGames([...selectedGames, { 
        key, 
        gameId, 
        gameName, 
        platform 
      }]);
    }
  };

  const isPlatformSelected = (gameId, platform) => {
    return selectedGames.some(sg => sg.key === `${gameId}-${platform}`);
  };

  const handleSave = () => {
    const params = { selectedSpecificGames: selectedGames };
    if (promotion) {
      params.promotion = promotion;
    }
    navigation.navigate(returnRoute, params);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          const params = { selectedSpecificGames: initialGames };
          if (promotion) {
            params.promotion = promotion;
          }
          navigation.navigate(returnRoute, params);
        }}>
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

      <Text style={styles.title}>Select Specific Games</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#ccc" />
        <TextInput
          placeholder="Type to search"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.list}>
        {filteredGames.map((game) => (
          <View key={game.id} style={styles.gameContainer}>
            <TouchableOpacity
              style={styles.gameItem}
              onPress={() => toggleGameExpansion(game.id)}
            >
              <Text style={styles.gameName}>{game.name}</Text>
              <Ionicons 
                name={expandedGame === game.id ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#A855F7" 
              />
            </TouchableOpacity>

            {expandedGame === game.id && (
              <View style={styles.platformsContainer}>
                {game.platforms.map((platform, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.platformCheckbox}
                    onPress={() => togglePlatform(game.id, game.name, platform)}
                  >
                    <View style={[
                      styles.checkbox,
                      isPlatformSelected(game.id, platform) && styles.checkboxSelected
                    ]}>
                      {isPlatformSelected(game.id, platform) && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.platformText}>{platform}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {selectedGames.length > 0 && (
        <View style={styles.buttonContainer}>
          <Text style={styles.selectedCount}>
            {selectedGames.length} game{selectedGames.length > 1 ? 's' : ''} selected
          </Text>
          <PrimaryButton
            title="Save Promotions"
            onPress={handleSave}
          />
        </View>
      )}
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141B3A",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  gameContainer: {
    marginBottom: 10,
  },
  gameItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
  },
  gameName: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  platformsContainer: {
    backgroundColor: "#141B3A",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 15,
    marginTop: -8,
  },
  platformCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#A855F7",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#A855F7",
  },
  platformText: {
    color: "#fff",
    fontSize: 15,
  },
  buttonContainer: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "#1B254F",
  },
  selectedCount: {
    color: "#A855F7",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});