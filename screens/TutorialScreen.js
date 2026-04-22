import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function TutorialScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Herbify Tutorial 📘</Text>

      <View style={styles.stepCard}>
        <Image source={require("../assets/tutorial1.png")} style={styles.img} />
        <Text style={styles.stepTitle}>Add Herbs</Text>
        <Text style={styles.stepDesc}>Start building your herbal garden in seconds.</Text>
      </View>

      <View style={styles.stepCard}>
        <Image source={require("../assets/tutorial1.png")} style={styles.img} />
        <Text style={styles.stepTitle}>Track Growth</Text>
        <Text style={styles.stepDesc}>Monitor watering, sunlight and health.</Text>
      </View>

      <View style={styles.stepCard}>
        <Image source={require("../assets/tutorial1.png")} style={styles.img} />
        <Text style={styles.stepTitle}>Get Alerts</Text>
        <Text style={styles.stepDesc}>Smart alerts to keep plants happy 🌱</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F6FFF6", padding: 20 },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },

  stepCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
  },

  img: { width: 200, height: 150, resizeMode: "contain", marginBottom: 12 },

  stepTitle: { fontSize: 20, fontWeight: "700", color: "#2E7D32" },
  stepDesc: { textAlign: "center", marginTop: 6, color: "#444" },
});
