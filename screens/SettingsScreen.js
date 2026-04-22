import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";

export default function SettingsScreen() {
  const [notif, setNotif] = useState(true);
  const [updates, setUpdates] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>App Settings ⚙️</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch value={notif} onValueChange={setNotif} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>App Updates</Text>
        <Switch value={updates} onValueChange={setUpdates} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F0FFF3", padding: 20 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },

  settingRow: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 3,
  },

  settingText: { fontSize: 16, fontWeight: "500" },
});
