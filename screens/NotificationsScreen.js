import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const alerts = [
    { id: 1, text: "Water Aloe Vera today 💧", icon: "water", color: "#0277BD" },
    { id: 2, text: "Tulsi needs sunlight ☀️", icon: "sunny", color: "#F9A825" },
    { id: 3, text: "Mint showing yellow leaves (disease warning)", icon: "warning", color: "#E53935" },
    { id: 4, text: "Winter care tips available ❄️", icon: "leaf", color: "#2E7D32" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Alerts & Notifications 🔔</Text>

        {alerts.map((a) => (
          <View key={a.id} style={styles.alertBox}>
            <Ionicons name={a.icon} size={28} color={a.color} />
            <Text style={styles.alertText}>{a.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FFF8" },
  container: { padding: 20 },

  title: { fontSize: 26, fontWeight: "800", color: "#1B5E20", marginBottom: 20 },

  alertBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
    gap: 12,
  },

  alertText: { fontSize: 15, color: "#444", flex: 1 },
});
