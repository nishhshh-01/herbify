// screens/PlantGrowthScreen.js

import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

export default function PlantGrowthScreen() {
  // Dummy growth data
  const plants = [
    { name: "Tulsi", growth: "45 cm", lastWatered: "2025-11-12" },
    { name: "Aloe Vera", growth: "30 cm", lastWatered: "2025-11-10" },
    { name: "Lavender", growth: "25 cm", lastWatered: "2025-11-08" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🌱 Plant Growth Tracker</Text>

        {plants.map((plant, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.info}>Current Growth: {plant.growth}</Text>
            <Text style={styles.info}>Last Watered: {plant.lastWatered}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FFF8",
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop:35,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#E9F7EF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
});
