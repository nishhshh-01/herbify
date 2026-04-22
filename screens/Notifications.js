import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsPage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications 🔔</Text>

      <View style={styles.notifCard}>
        <Ionicons name="water" size={26} color="#1E90FF" />
        <Text style={styles.notifText}>Your Basil needs watering today.</Text>
      </View>

      <View style={styles.notifCard}>
        <Ionicons name="sunny" size={26} color="#FFA726" />
        <Text style={styles.notifText}>Mint got 3 hours of sunlight.</Text>
      </View>

      <View style={styles.notifCard}>
        <Ionicons name="checkmark-circle" size={26} color="#2E7D32" />
        <Text style={styles.notifText}>Lavender growth updated.</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F0FFF0", padding: 20 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },

  notifCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 3,
    marginBottom: 12,
    gap: 15,
  },

  notifText: { fontSize: 16, color: "#333" },
});
