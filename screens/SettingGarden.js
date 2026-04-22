import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.header}>⚙️ Garden Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="notifications" size={24} color="#2E7D32" />
          <Text style={styles.rowText}>Care Reminders</Text>
          <Switch thumbColor="#2E7D32" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="water" size={24} color="#1E90FF" />
          <Text style={styles.rowText}>Watering Alerts</Text>
          <Switch thumbColor="#2E7D32" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="sunny" size={24} color="#FFA500" />
          <Text style={styles.rowText}>Sunlight Alerts</Text>
          <Switch thumbColor="#2E7D32" />
        </TouchableOpacity>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Garden Preferences</Text>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="leaf" size={24} color="#2E7D32" />
          <Text style={styles.rowText}>Auto Plant Sorting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="color-palette" size={24} color="#6C63FF" />
          <Text style={styles.rowText}>Theme & Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="analytics" size={24} color="#FF5252" />
          <Text style={styles.rowText}>Growth Insights</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle" size={24} color="#2E7D32" />
          <Text style={styles.rowText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="log-out" size={24} color="#E53935" />
          <Text style={[styles.rowText, { color: "#E53935" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3FFF3" },

  header: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2E7D32",
    marginBottom: 15,
  },

  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 15,
  },

  rowText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

