import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SEASONS = ["Summer", "Winter", "Monsoon", "All Season"];
const REGIONS = ["North India", "South India", "East India", "West India", "All India"];
const DISEASES = [
  "Cold", "Cough", "Fever", "Digestion", "Skin",
  "Stress", "Diabetes", "Heart", "Immunity", "Joint Pain",
  "Anxiety", "Memory", "Hair", "Weight Loss",
];
const PROPERTIES = [
  "Antibacterial", "Anti-inflammatory", "Antioxidant",
  "Adaptogenic", "Nootropic", "Cardioprotective",
  "Immunomodulatory", "Antimicrobial", "Antifungal",
];

export default function FiltersScreen({ navigation }) {
  const [selectedAZ, setSelectedAZ] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);

  function toggle(arr, val, setter) {
    if (arr.includes(val)) {
      setter(arr.filter((v) => v !== val));
    } else {
      setter([...arr, val]);
    }
  }

  const totalActive =
    (selectedAZ ? 1 : 0) +
    selectedSeason.length +
    selectedRegion.length +
    selectedDisease.length +
    selectedProperty.length;

  const handleReset = () => {
    setSelectedAZ(null);
    setSelectedSeason([]);
    setSelectedRegion([]);
    setSelectedDisease([]);
    setSelectedProperty([]);
  };

  const handleApply = () => {
    navigation.navigate("Home", {
      filters: {
        sortAZ: selectedAZ,
        seasons: selectedSeason,
        regions: selectedRegion,
        diseases: selectedDisease,
        properties: selectedProperty,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FFF8" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        {totalActive > 0 ? (
          <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
            <Text style={styles.resetText}>Reset ({totalActive})</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 70 }} />
        )}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Sort */}
        <Text style={styles.heading}>Sort Order</Text>
        <View style={styles.row}>
          {["A → Z", "Z → A"].map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, selectedAZ === v && styles.chipActive]}
              onPress={() => setSelectedAZ(selectedAZ === v ? null : v)}
            >
              <Text style={selectedAZ === v ? styles.chipActiveText : styles.chipText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Season */}
        <Text style={styles.heading}>Season</Text>
        <View style={styles.row}>
          {SEASONS.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, selectedSeason.includes(v) && styles.chipActive]}
              onPress={() => toggle(selectedSeason, v, setSelectedSeason)}
            >
              <Text style={selectedSeason.includes(v) ? styles.chipActiveText : styles.chipText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Region */}
        <Text style={styles.heading}>Region</Text>
        <View style={styles.row}>
          {REGIONS.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, selectedRegion.includes(v) && styles.chipActive]}
              onPress={() => toggle(selectedRegion, v, setSelectedRegion)}
            >
              <Text style={selectedRegion.includes(v) ? styles.chipActiveText : styles.chipText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Helpful for diseases */}
        <Text style={styles.heading}>Helpful For</Text>
        <View style={styles.row}>
          {DISEASES.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, selectedDisease.includes(v) && styles.chipActive]}
              onPress={() => toggle(selectedDisease, v, setSelectedDisease)}
            >
              <Text style={selectedDisease.includes(v) ? styles.chipActiveText : styles.chipText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Therapeutic properties */}
        <Text style={styles.heading}>Therapeutic Properties</Text>
        <View style={styles.row}>
          {PROPERTIES.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, selectedProperty.includes(v) && styles.chipActive]}
              onPress={() => toggle(selectedProperty, v, setSelectedProperty)}
            >
              <Text style={selectedProperty.includes(v) ? styles.chipActiveText : styles.chipText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Fixed apply button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.applyText}>
            Apply Filters{totalActive > 0 ? ` (${totalActive} active)` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2E0",
    backgroundColor: "#fff",
  },
  backBtn: { padding: 4 },
  title: { fontSize: 22, fontWeight: "800", color: "#1B5E20" },
  resetBtn: {
    backgroundColor: "#FFE0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  resetText: { color: "#c62828", fontWeight: "700", fontSize: 13 },

  container: { flex: 1, padding: 18 },

  heading: { fontSize: 17, fontWeight: "700", marginTop: 18, marginBottom: 10, color: "#1B5E20" },

  row: { flexDirection: "row", flexWrap: "wrap" },

  chip: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#A5D6A7",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
    elevation: 1,
  },
  chipActive: { backgroundColor: "#2E7D32", borderColor: "#2E7D32" },
  chipText: { color: "#2E7D32", fontWeight: "600", fontSize: 13 },
  chipActiveText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 18,
    right: 18,
  },
  applyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#2E7D32",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  applyText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
