import React from "react";
import { Animated, Dimensions, Easing, Image } from "react-native";

import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MyGardenStatsScreen() {const { width, height } = Dimensions.get("window");

function FallingLeaf({ delay }) {
  const fallY = React.useRef(new Animated.Value(0)).current;
  const swayX = React.useRef(new Animated.Value(0)).current;
  const rotate = React.useRef(new Animated.Value(0)).current;

  const startX = Math.random() * (width - 40);

  React.useEffect(() => {
   
    Animated.loop(
      Animated.timing(fallY, {
        toValue: height,
        duration: 7000 + Math.random() * 3000,
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
        opacity: 0.7,
        transform: [
          { translateY: fallY },
          { translateX: swayX },
          { rotate: rotateInterpolate },
        ],
      }}
    >
      <Image
        source={require("../assets/leaf.png")}
        style={{ width: 45, height: 45, opacity: 0.9 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

  return (
    <SafeAreaView style={styles.safe}><FallingLeaf delay={0} />
<FallingLeaf delay={600} />
<FallingLeaf delay={1200} />
<FallingLeaf delay={2000} />
<FallingLeaf delay={3000} />

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>My Garden Stats 🌱</Text>

        {/* 🌿 Plants Added */}
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={32} color="#2E7D32" />
          <View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Plants Added</Text>
          </View>
        </View>

        {/* 💧 Water Count */}
        <View style={styles.statCard}>
          <Ionicons name="water" size={32} color="#1E90FF" />
          <View>
            <Text style={styles.statValue}>34</Text>
            <Text style={styles.statLabel}>Times Watered</Text>
          </View>
        </View>

        {/* ❤️ Favorites */}
        <View style={styles.statCard}>
          <Ionicons name="heart" size={32} color="#E53935" />
          <View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        {/* 📈 Weekly Growth */}
        <View style={styles.bigCard}>
          <Text style={styles.bigTitle}>Weekly Growth Progress</Text>
          <Text style={styles.progressText}>
            Your plants grew <Text style={{ fontWeight: "700" }}>32%</Text> this week 🌿
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
  safe: {
    flex: 1,
    backgroundColor: "#F2FFF2",
    paddingTop: Platform.OS === "android" ? 35 : 10,
  },

  container: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2E7D32",
    marginBottom: 25,
    textAlign: "left",
  },

  statCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 18,
    gap: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
  },

  statLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  bigCard: {
    backgroundColor: "#D5F6D8",
    padding: 22,
    borderRadius: 18,
    marginTop: 15,
    marginBottom: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  bigTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1B5E20",
  },

  progressText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
