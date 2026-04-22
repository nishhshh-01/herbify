import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Colour palette for herb category badges
const BADGE_COLORS = [
  "#E8F5E9", "#E3F2FD", "#FFF3E0", "#F3E5F5", "#E0F7FA", "#FBE9E7", "#F9FBE7",
];
const BADGE_TEXT_COLORS = [
  "#2E7D32", "#1565C0", "#E65100", "#6A1B9A", "#006064", "#BF360C", "#558B2F",
];

export default function PlantDetailScreen({ route, navigation }) {
  const { plant } = route.params;
  const [addedToGarden, setAddedToGarden] = useState(false);

  // Safely get image — local require() or fallback
  const imageSource = plant.img || plant.image || require("../assets/basil.png");

  const joinOrDash = (value) => {
    if (!value) return "—";
    if (Array.isArray(value)) return value.join(", ");
    return value;
  };

  const renderChips = (items, colorIndex = 0) => {
    if (!items || !items.length) return <Text style={styles.chipPlaceholder}>—</Text>;
    return (
      <View style={styles.chipsWrap}>
        {items.map((item, idx) => {
          const ci = (colorIndex + idx) % BADGE_COLORS.length;
          return (
            <View key={idx} style={[styles.chip, { backgroundColor: BADGE_COLORS[ci] }]}>
              <Text style={[styles.chipText, { color: BADGE_TEXT_COLORS[ci] }]}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const handleAddToGarden = () => {
    if (addedToGarden) {
      navigation.navigate("MyGarden");
      return;
    }
    setAddedToGarden(true);
    navigation.navigate("MyGarden", { newPlant: plant });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4FFF4" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Hero image with back button */}
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
          {/* Dark gradient overlay for readability */}
          <View style={styles.imageOverlay} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          {/* Herb name overlaid on image */}
          <View style={styles.imageNameWrap}>
            <Text style={styles.imageHeroName}>{plant.name}</Text>
            <Text style={styles.imageHeroSci}>{plant.scientificName}</Text>
          </View>
        </View>

        {/* Family / Genus quick info strip */}
        <View style={styles.stripRow}>
          {plant.family ? (
            <View style={styles.stripItem}>
              <Ionicons name="layers-outline" size={14} color="#2E7D32" />
              <Text style={styles.stripText}> Family: {plant.family}</Text>
            </View>
          ) : null}
          {plant.genus ? (
            <View style={styles.stripItem}>
              <Ionicons name="git-branch-outline" size={14} color="#2E7D32" />
              <Text style={styles.stripText}> Genus: {plant.genus}</Text>
            </View>
          ) : null}
        </View>

        {/* Info grid */}
        <View style={styles.infoGrid}>
          <InfoCard label="🌱 Plant Size" value={plant.plantSize || plant.size} />
          <InfoCard label="🌍 Native Region" value={joinOrDash(plant.nativeRegion)} />
          <InfoCard label="🌤 Climate" value={joinOrDash(plant.preferredClimate)} />
          <InfoCard label="☀️ Sunlight" value={joinOrDash(plant.requiredSunlight)} />
          <InfoCard label="🪴 Soil" value={joinOrDash(plant.requiredSoil)} />
          <InfoCard label="💊 Parts Used" value={joinOrDash(plant.partsUsed)} />
        </View>

        {/* Active compounds */}
        <SectionCard title="⚗️ Active Compounds">
          {renderChips(plant.activeCompounds, 0)}
        </SectionCard>

        {/* Therapeutic properties */}
        <SectionCard title="🩺 Therapeutic Properties">
          {renderChips(plant.therapeuticProperties, 2)}
        </SectionCard>

        {/* Dosage forms */}
        <SectionCard title="💉 Dosage Forms">
          {renderChips(plant.dosageForms, 4)}
        </SectionCard>

        {/* Health benefits */}
        {plant.healthBenefits && plant.healthBenefits.length > 0 && (
          <SectionCard title="✅ Health Benefits">
            {plant.healthBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <Ionicons name="checkmark-circle" size={16} color="#2E7D32" style={{ marginTop: 2 }} />
                <Text style={styles.bullet}> {benefit}</Text>
              </View>
            ))}
          </SectionCard>
        )}

        {/* About */}
        <SectionCard title={`📖 About ${plant.name}`}>
          <Text style={styles.aboutText}>
            {plant.plantSize ||
              (plant.healthBenefits && plant.healthBenefits[0]) ||
              "This herb is known for its wide range of traditional AYUSH applications, supporting overall health and well-being."}
          </Text>
        </SectionCard>

        {/* CTA button */}
        <TouchableOpacity
          style={[styles.addButton, addedToGarden && styles.addButtonDone]}
          onPress={handleAddToGarden}
          activeOpacity={0.85}
        >
          <Ionicons
            name={addedToGarden ? "checkmark-circle" : "add-circle-outline"}
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addButtonText}>
            {addedToGarden ? "View in My Garden →" : "Add to My Garden"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function InfoCard({ label, value }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  );
}

function SectionCard({ title, children }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 40 },

  imageWrapper: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    backgroundColor: "#C8E6C9",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
  },
  imageNameWrap: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  imageHeroName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  imageHeroSci: {
    fontSize: 14,
    color: "#d0f0d0",
    fontStyle: "italic",
    marginTop: 2,
  },

  stripRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#E8F5E9",
    borderBottomWidth: 1,
    borderBottomColor: "#C8E6C9",
    gap: 12,
  },
  stripItem: { flexDirection: "row", alignItems: "center" },
  stripText: { fontSize: 12, color: "#2E7D32", fontWeight: "600" },

  infoGrid: {
    paddingHorizontal: 14,
    paddingTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoLabel: { fontSize: 12, fontWeight: "700", color: "#1B5E20", marginBottom: 4 },
  infoValue: { fontSize: 13, color: "#333", lineHeight: 18 },

  sectionCard: {
    marginTop: 12,
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1B5E20", marginBottom: 10 },

  chipsWrap: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: { fontSize: 12, fontWeight: "600" },
  chipPlaceholder: { fontSize: 13, color: "#777" },

  benefitRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  bullet: { fontSize: 14, color: "#333", flex: 1, lineHeight: 20 },
  aboutText: { fontSize: 14, color: "#444", lineHeight: 21 },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginHorizontal: 18,
    backgroundColor: "#2E7D32",
    borderRadius: 30,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: "#2E7D32",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  addButtonDone: { backgroundColor: "#388E3C" },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
