import herbs from "../data/herbs.json";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Modal,
  Animated,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ── Herb-of-Day data ──────────────────────────────────────────────────────────
const HERB_OF_DAY = {
  name: "Tulsi",
  image: require("../assets/banner1.png"),
  description: "Boosts immunity, reduces cold & cough, improves digestion.",
  benefits: [
    "Rich in antioxidants",
    "Helps reduce stress",
    "Supports respiratory health",
  ],
  usage: "Drink as herbal tea or chew fresh leaves in the morning.",
};

// ── Banner slides for auto-rotate ─────────────────────────────────────────────
const BANNER_SLIDES = [
  {
    image: require("../assets/banner1.png"),
    title: "🌿 Herb of the Day",
    subtitle: "Tap to discover Tulsi's healing powers",
    tapable: true,
  },
  {
    image: require("../assets/banner2.png"),
    title: "🌱 Grow Your Garden",
    subtitle: "Add herbs & track their growth",
    tapable: false,
  },
  {
    image: require("../assets/banner3.png"),
    title: "☀️ Seasonal Tips",
    subtitle: "Best practices for summer care",
    tapable: false,
  },
  {
    image: require("../assets/banner4.png"),
    title: "🍃 AYUSH Remedies",
    subtitle: "Ancient wisdom, modern living",
    tapable: false,
  },
];

// ── Local image map ────────────────────────────────────────────────────────────
const herbImages = {
  neem: require("../assets/coriander.png"),
  aloe_vera: require("../assets/aloevera.png"),
  camphor: require("../assets/capor.png"),
  garlic: require("../assets/garlic file.png"),
  brahmi: require("../assets/mint.png"),
  nagkesar: require("../assets/lavender.png"),
  holy_basil: require("../assets/basil.png"),
  // new herbs use network images — fallback to basil if offline
  ashwagandha: require("../assets/basil.png"),
  turmeric: require("../assets/basil.png"),
  giloy: require("../assets/mint.png"),
  shatavari: require("../assets/lavender.png"),
  triphala: require("../assets/coriander.png"),
  moringa: require("../assets/basil.png"),
  ginger: require("../assets/garlic file.png"),
  arjuna: require("../assets/rosemary.png"),
};

// ── Quick-tip cards ────────────────────────────────────────────────────────────
const QUICK_TIPS = [
  { icon: "sunny-outline", text: "Water herbs early morning", color: "#FFF9C4" },
  { icon: "leaf-outline", text: "Prune for bushier growth", color: "#C8E6C9" },
  { icon: "rainy-outline", text: "Avoid over-watering roots", color: "#B3E5FC" },
  { icon: "flame-outline", text: "Keep away from harsh noon sun", color: "#FFE0B2" },
  { icon: "moon-outline", text: "Compost adds vital nutrients", color: "#E8EAF6" },
];

// ── Season banner ──────────────────────────────────────────────────────────────
function getSeasonInfo() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return { label: "🌸 Spring", tip: "Great time to plant Tulsi & Brahmi!", color: "#F3E5F5" };
  if (month >= 5 && month <= 7) return { label: "☀️ Summer", tip: "Water herbs twice a day. Protect from harsh sun.", color: "#FFF3E0" };
  if (month >= 8 && month <= 10) return { label: "🍂 Autumn", tip: "Harvest before first frost. Dry herbs for storage.", color: "#FBE9E7" };
  return { label: "❄️ Winter", tip: "Move pots indoors. Reduce watering frequency.", color: "#E3F2FD" };
}

export default function HomeScreen({ navigation }) {
  const [showHerbModal, setShowHerbModal] = useState(false);
  const [query, setQuery] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const season = getSeasonInfo();

  // ── Auto-rotate banners ────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        setBannerIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = BANNER_SLIDES[bannerIndex];

  // ── Build herb cards ───────────────────────────────────────────────────────
  const herbCards = herbs.map((herb) => ({
    ...herb,
    img: herbImages[herb.id] || require("../assets/basil.png"),
  }));

  // ── Search / filter ────────────────────────────────────────────────────────
  const matchesQuery = (herb, q) => {
    if (!q) return true;
    const text = q.toLowerCase();
    return (
      herb.name.toLowerCase().includes(text) ||
      herb.scientificName?.toLowerCase().includes(text) ||
      herb.healthBenefits?.some((b) => b.toLowerCase().includes(text)) ||
      herb.therapeuticProperties?.some((p) => p.toLowerCase().includes(text))
    );
  };

  const getMatchingKeywords = (herb, q) => {
    if (!q) return [];
    const text = q.toLowerCase();
    const matches = [];
    herb.healthBenefits?.forEach((x) => { if (x.toLowerCase().includes(text)) matches.push(x); });
    herb.therapeuticProperties?.forEach((x) => { if (x.toLowerCase().includes(text)) matches.push(x); });
    if (herb.name.toLowerCase().includes(text)) matches.push(herb.name);
    if (herb.scientificName?.toLowerCase().includes(text)) matches.push(herb.scientificName);
    return matches.slice(0, 2);
  };

  const filteredHerbs = herbCards.filter((herb) => matchesQuery(herb, query));
  const featuredHerbs = filteredHerbs.slice(0, 5);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("LOGGED_IN", "false");
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FFF8" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF8" />

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL — Placed OUTSIDE ScrollView to fix the overlay/z-index bug.
          Previously the modal was inside ScrollView which caused it to appear
          behind other UI elements. Moving it here (direct child of SafeAreaView)
          ensures it renders above everything else correctly.
         ───────────────────────────────────────────────────────────────────── */}
      <Modal
        visible={showHerbModal}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowHerbModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowHerbModal(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
            <Image source={HERB_OF_DAY.image} style={styles.modalImage} resizeMode="cover" />
            <View style={styles.modalHandle} />
            <Text style={styles.modalLabel}>🌿 Herb of the Day</Text>
            <Text style={styles.modalTitle}>{HERB_OF_DAY.name}</Text>
            <Text style={styles.modalDesc}>{HERB_OF_DAY.description}</Text>
            <Text style={styles.modalSubTitle}>✨ Benefits</Text>
            {HERB_OF_DAY.benefits.map((item, i) => (
              <Text key={i} style={styles.modalPoint}>• {item}</Text>
            ))}
            <Text style={styles.modalSubTitle}>🍵 How to Use</Text>
            <Text style={styles.modalPoint}>{HERB_OF_DAY.usage}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowHerbModal(false)}>
              <Ionicons name="close-circle" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ── Main scroll ── */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetText}>🌿 HerbalGarden</Text>
            <Text style={styles.greetSub}>Your Ayurvedic companion</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={16} color="#fff" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Auto-rotating banner */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => currentBanner.tapable && setShowHerbModal(true)}
          >
            <ImageBackground
              source={currentBanner.image}
              style={styles.hero}
              imageStyle={{ borderRadius: 20 }}
              resizeMode="cover"
            >
              <View style={styles.heroDark} />
              <View style={styles.heroTextWrap}>
                <Text style={styles.heroTitle}>{currentBanner.title}</Text>
                <Text style={styles.heroSub}>{currentBanner.subtitle}</Text>
                {currentBanner.tapable && (
                  <View style={styles.heroBadge}>
                    <Text style={styles.heroBadgeText}>Tap to learn more →</Text>
                  </View>
                )}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        {/* Banner indicator dots */}
        <View style={styles.dotsRow}>
          {BANNER_SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setBannerIndex(i)}>
              <View style={[styles.dot, i === bannerIndex && styles.dotActive]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#2E7D32" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search symptoms or herbs..."
            placeholderTextColor="#6b6b6b"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Filters")} style={{ marginLeft: 6 }}>
            <Ionicons name="options-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
        {query.length > 0 && (
          <Text style={styles.resultCount}>
            {filteredHerbs.length} result{filteredHerbs.length !== 1 ? "s" : ""} for "{query}"
          </Text>
        )}

        {/* Season tip — only when not searching */}
        {!query && (
          <View style={[styles.seasonCard, { backgroundColor: season.color }]}>
            <Ionicons name="leaf" size={16} color="#2E7D32" style={{ marginBottom: 4 }} />
            <Text style={styles.seasonLabel}>{season.label} Season</Text>
            <Text style={styles.seasonTip}>{season.tip}</Text>
          </View>
        )}

        {/* Quick tips row */}
        {!query && (
          <>
            <Text style={styles.sectionTitle}>Quick Care Tips</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 22 }}>
              {QUICK_TIPS.map((tip, i) => (
                <View key={i} style={[styles.tipCard, { backgroundColor: tip.color }]}>
                  <Ionicons name={tip.icon} size={26} color="#2E7D32" />
                  <Text style={styles.tipText}>{tip.text}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* Featured herbs horizontal */}
        <Text style={styles.sectionTitle}>
          {query ? "Matching Herbs" : "Featured Herbs"}
        </Text>
        <ScrollView horizontal style={styles.rowScroll} showsHorizontalScrollIndicator={false}>
          {featuredHerbs.length === 0 ? (
            <Text style={{ color: "#666", padding: 10, alignSelf: "center" }}>No herbs match your search.</Text>
          ) : (
            featuredHerbs.map((plant) => (
              <TouchableOpacity
                key={plant.id}
                style={styles.card}
                onPress={() => navigation.navigate("PlantDetail", { plant })}
                activeOpacity={0.85}
              >
                <Image source={plant.img} style={styles.cardImage} />
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{plant.name}</Text>
                  {query.length > 0 && getMatchingKeywords(plant, query).length > 0 && (
                    <Text style={styles.matchText}>{getMatchingKeywords(plant, query).join(" • ")}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Explore grid */}
        <Text style={styles.sectionTitle}>Explore All Herbs</Text>
        <View style={styles.gridContainer}>
          {filteredHerbs.map((plant) => (
            <TouchableOpacity
              key={plant.id}
              style={styles.gridCard}
              onPress={() => navigation.navigate("PlantDetail", { plant })}
              activeOpacity={0.85}
            >
              <Image source={plant.img} style={styles.gridImage} />
              <View style={styles.gridInfo}>
                <Text style={styles.gridName}>{plant.name}</Text>
                <Text style={styles.gridSci} numberOfLines={1}>{plant.scientificName}</Text>
                {query.length > 0 && getMatchingKeywords(plant, query).length > 0 && (
                  <Text style={styles.gridMatchText}>{getMatchingKeywords(plant, query).join(" • ")}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🌿 Quiz FAB */}
      <TouchableOpacity
        style={styles.quizFab}
        onPress={() => navigation.navigate("AyurvedicQuiz")}
        activeOpacity={0.85}
      >
        <Ionicons name="help-circle" size={22} color="#fff" />
        <Text style={styles.quizFabText}>Quiz</Text>
      </TouchableOpacity>

      {/* Bottom navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={26} color="#2E7D32" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MyGarden")}>
          <Ionicons name="leaf" size={26} color="#2E7D32" />
          <Text style={styles.navTextActive}>Garden</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Alerts")}>
          <Ionicons name="notifications" size={26} color="#777" />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={26} color="#777" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F8FFF8" },

  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  greetText: { fontSize: 22, fontWeight: "800", color: "#1B5E20" },
  greetSub: { fontSize: 13, color: "#555", marginTop: 2 },
  logoutBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#c62828", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  logoutText: { color: "#fff", fontSize: 12, fontWeight: "700", marginLeft: 4 },

  hero: { width: "100%", height: 190, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end" },
  heroDark: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.32)", borderRadius: 20 },
  heroTextWrap: { padding: 16 },
  heroTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  heroSub: { color: "#e0ffe0", fontSize: 13, marginTop: 3 },
  heroBadge: { marginTop: 8, alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.22)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  heroBadgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  dotsRow: { flexDirection: "row", justifyContent: "center", marginTop: 8, marginBottom: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#b2dfb2", marginHorizontal: 3 },
  dotActive: { backgroundColor: "#2E7D32", width: 18 },

  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#ebfae7", paddingVertical: 2, paddingHorizontal: 14, borderRadius: 30, marginTop: 10, marginBottom: 4, elevation: 3, borderWidth: 1, borderColor: "#038303" },
  searchInput: { flex: 1, marginLeft: 10, marginRight: 6, fontSize: 16, color: "#2E7D32", paddingVertical: 10 },
  resultCount: { fontSize: 13, color: "#555", marginBottom: 10, marginLeft: 4 },

  seasonCard: { borderRadius: 14, padding: 14, marginBottom: 18, marginTop: 12 },
  seasonLabel: { fontWeight: "800", fontSize: 15, color: "#1B5E20", marginBottom: 3 },
  seasonTip: { fontSize: 13, color: "#333", lineHeight: 19 },

  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#1B5E20", marginTop: 4 },
  tipCard: { width: 130, borderRadius: 14, padding: 12, marginRight: 10, alignItems: "center", justifyContent: "center", minHeight: 90 },
  tipText: { fontSize: 12, color: "#2E7D32", fontWeight: "600", textAlign: "center", marginTop: 6 },

  rowScroll: { marginBottom: 25 },
  card: { width: 160, height: 210, borderRadius: 20, overflow: "hidden", backgroundColor: "#e8f5e9", marginRight: 15, elevation: 5, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  cardTitleContainer: { position: "absolute", bottom: 0, width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.38)" },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  matchText: { color: "#C8FFCB", fontSize: 12, marginTop: 3, fontStyle: "italic" },

  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 4 },
  gridCard: { width: "48%", borderRadius: 16, marginBottom: 14, overflow: "hidden", backgroundColor: "#fff", elevation: 4, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  gridImage: { width: "100%", height: 115, resizeMode: "cover" },
  gridInfo: { padding: 9 },
  gridName: { fontSize: 15, fontWeight: "700", color: "#2E7D32" },
  gridSci: { fontSize: 11, color: "#777", fontStyle: "italic", marginTop: 2 },
  gridMatchText: { fontSize: 11, color: "#1B5E20", opacity: 0.8, fontStyle: "italic", marginTop: 2 },

  navbar: { position: "absolute", bottom: 20, left: 20, right: 20, flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", paddingVertical: 12, borderRadius: 30, elevation: 12, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#777", marginTop: 3 },
  navTextActive: { fontSize: 12, color: "#2E7D32", fontWeight: "700", marginTop: 3 },

  quizFab: {
    position: "absolute",
    bottom: 92,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 8,
    shadowColor: "#2E7D32",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  quizFabText: { color: "#fff", fontWeight: "700", fontSize: 13, marginLeft: 5 },

  // Modal styles — critical: modal is outside ScrollView now
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end" },
  modalBox: { backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingBottom: 32, overflow: "hidden" },
  modalHandle: { width: 40, height: 4, backgroundColor: "#ccc", borderRadius: 2, alignSelf: "center", marginTop: 10, marginBottom: 4 },
  modalImage: { width: "100%", height: 210 },
  modalLabel: { fontSize: 13, color: "#2E7D32", fontWeight: "700", paddingHorizontal: 20, marginTop: 10 },
  modalTitle: { fontSize: 26, fontWeight: "800", color: "#1B5E20", paddingHorizontal: 20, marginTop: 2 },
  modalDesc: { fontSize: 14, color: "#555", paddingHorizontal: 20, marginTop: 6, lineHeight: 20 },
  modalSubTitle: { fontSize: 15, fontWeight: "700", color: "#1B5E20", paddingHorizontal: 20, marginTop: 14, marginBottom: 4 },
  modalPoint: { fontSize: 14, color: "#333", paddingHorizontal: 26, marginBottom: 3, lineHeight: 20 },
  closeBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2E7D32", marginHorizontal: 20, marginTop: 20, borderRadius: 28, paddingVertical: 13 },
  closeBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
