// screens/AlertsScreen.js

import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

export default function AlertsScreen() {
  // Dummy alerts data
  const alerts = [
    { id: 1, type: "Water Reminder", message: "Aloe Vera said: ‘Bro… water? Hello??" },
    { id: 2, type: "Dehydration Alert", message: "“Mint looking crunchy. Give hydration or give coffin ☠️" },
    { id: 3, type: "Sunlight Alert", message: "Put your plant in sunlight rn… it’s looking like a night shift employee" },
    { id: 4, type: "Tips", message: "Compost = plant protein shake. Go feed your gym bro herb 💪🌱" },
    { id: 5, type: "Tips", message: "New herb added to Herbify! Explore now." },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🔔 Alerts</Text>

        {alerts.map((alert) => (
          <View key={alert.id} style={styles.card}>
            <Text style={styles.type}>{alert.type}</Text>
            <Text style={styles.message}>{alert.message}</Text>
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
    marginBottom: 20,
    marginTop:25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#E9F7EF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  type: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
});
