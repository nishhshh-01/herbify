// screens/MyGardenScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");


let gardenStore = [];


// Falling Leaf Animation

function FallingLeaf({ delay }) {
  const fallY = React.useRef(new Animated.Value(0)).current;
  const swayX = React.useRef(new Animated.Value(0)).current;
  const rotate = React.useRef(new Animated.Value(0)).current;
  const startX = Math.random() * (width - 40);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(fallY, {
        toValue: height,
        duration: 8000,
        delay,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(swayX, {
          toValue: 20,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(swayX, {
          toValue: -20,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: -60,
        left: startX,
        transform: [
          { translateY: fallY },
          { translateX: swayX },
          { rotate: rotateInterpolate },
        ],
        opacity: 0.8,
      }}
    >
      <Image
        source={require("../assets/leaf.png")}
        style={{ width: 45, height: 45 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

// % progress
function getGrowthStage(pct) {
  if (pct < 35) return "Newly Planted";
  if (pct < 70) return "Growing";
  return "Mature";
}

// badge from plant data
function getBadge(plant) {
  if (Array.isArray(plant.therapeuticProperties) && plant.therapeuticProperties.length > 0) {
    return plant.therapeuticProperties[0]; 
  }
  if (Array.isArray(plant.healthBenefits) && plant.healthBenefits.length > 0) {
    return plant.healthBenefits[0];
  }
  return "Herbal";
}

// derive simple "today's tasks" 
function buildTasks(garden) {
  const tasks = [];
  garden.forEach((plant, index) => {
    if (index % 2 === 0) {
      tasks.push(`💧 Water ${plant.name}`);
    } else {
      tasks.push(`🌤 Check sunlight for ${plant.name}`);
    }
  });
  return tasks.slice(0, 4); 
}


export default function MyGardenScreen({ navigation, route }) {
  const [garden, setGarden] = useState(gardenStore);

  // sent from PlantDetailScreen
  useEffect(() => {
    const newPlant = route?.params?.newPlant;
    if (!newPlant) return;

    console.log("NEW PLANT RECEIVED:", newPlant.name);

    
    const alreadyThere = gardenStore.some((p) => p.id === newPlant.id);
    if (!alreadyThere) {
      const growthProgress = 30 + Math.floor(Math.random() * 60); // 30–90%
      gardenStore = [
        {
          ...newPlant,
          gardenItemId: "g" + Date.now().toString(),
          growthProgress,
        },
        ...gardenStore,
      ];
    }

   
    setGarden([...gardenStore]);

    
    navigation.setParams({ newPlant: undefined });
  }, [route?.params?.newPlant]);

  // delete plant
  const deletePlant = (gardenItemId) => {
    Alert.alert("Delete Plant?", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          gardenStore = gardenStore.filter(
            (p) => p.gardenItemId !== gardenItemId
          );
          setGarden([...gardenStore]);
        },
      },
    ]);
  };

 
  const totalPlants = garden.length;
  const tasks = buildTasks(garden);

  return (
    <SafeAreaView style={styles.safe}>
     
      <FallingLeaf delay={0} />
      <FallingLeaf delay={500} />
      <FallingLeaf delay={1000} />

     
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#1F6F3A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>🌱 My Garden</Text>
        <Text style={styles.headerSub}>Your personal herb collection</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Herbs</Text>
            <Text style={styles.statValue}>{totalPlants}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Unique Types</Text>
            <Text style={styles.statValue}>{totalPlants}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Today's Tasks</Text>
            <Text style={styles.statValue}>{tasks.length}</Text>
          </View>
        </View>

       
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Today’s Care Tasks</Text>
          {tasks.length === 0 ? (
            <Text style={styles.sectionText}>
              No tasks yet — add herbs to get care suggestions 🌿
            </Text>
          ) : (
            tasks.map((task, idx) => (
              <Text key={idx} style={styles.taskItem}>
                {task}
              </Text>
            ))
          )}
        </View>

        
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Your Plants
        </Text>

        <View style={styles.grid}>
          {garden.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#666" }}>
              Your garden is empty — add herbs from the details page 🌿
            </Text>
          ) : (
            garden.map((plant) => {
              const pct = plant.growthProgress ?? 50;
              const stage = getGrowthStage(pct);
              const badge = getBadge(plant);

              return (
                <View key={plant.gardenItemId} style={styles.card}>
                 
                  <View style={styles.badge}>
                    <Text style={styles.badgeText} numberOfLines={1}>
                      {badge}
                    </Text>
                  </View>

                 
                  <TouchableOpacity
                    style={{ flex: 1, flexDirection: "row" }}
                    onPress={() =>
                      navigation.navigate("PlantDetail", { plant })
                    }
                  >
                    <Image source={plant.img || require("../assets/basil.png")} style={styles.cardImage} />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{plant.name}</Text>
                      <Text style={styles.cardStage}>
                        {stage} • {pct}%
                      </Text>

                     
                      <View style={styles.progressTrack}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${pct}%` },
                          ]}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  
                  <TouchableOpacity
                    onPress={() => deletePlant(plant.gardenItemId)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color="#D32F2F"
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5FFF7",
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 18,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    position: "absolute",
    left: 12,
    top: 45,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F6F3A",
    textAlign: "center",
  },
  headerSub: {
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  scroll: {
    padding: 18,
    paddingBottom: 32,
  },

  // stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#33691E",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 4,
  },

  // sections
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#245B2A",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
  taskItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  card: {
    width: "48%",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    position: "relative",
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 10,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#233",
  },
  cardStage: {
    fontSize: 11,
    color: "#4CAF50",
    marginTop: 2,
  },
  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#2E7D32",
  },

  badge: {
    position: "absolute",
    top: 6,
    left: 8,
    backgroundColor: "#C8E6C9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    zIndex: 5,
    maxWidth: "70%",
  },
  badgeText: {
    fontSize: 10,
    color: "#1B5E20",
    fontWeight: "600",
  },
});
