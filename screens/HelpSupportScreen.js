import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HelpSupportScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Help & Support 💬</Text>

        <Text style={styles.subTitle}>Frequently Asked</Text>

        <FAQ question="How to add plants to My Garden?" />
        <FAQ question="Why am I not receiving alerts?" />
        <FAQ question="How to edit profile info?" />
        <FAQ question="How to improve plant growth?" />

        <View style={{ marginTop: 25 }}>
          <Text style={styles.subTitle}>Contact Support</Text>

          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="mail" size={22} color="#fff" />
            <Text style={styles.contactText}>Email Support</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function FAQ({ question }) {
  return (
    <View style={styles.faqBox}>
      <Text style={styles.faqText}>{question}</Text>
      <Ionicons name="chevron-down" size={20} color="#777" />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FFF8" },
  container: { padding: 20 },

  title: { fontSize: 26, fontWeight: "800", color: "#1B5E20" },
  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 15,
    color: "#2E7D32",
  },

  faqBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  faqText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },

  contactBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  contactText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
});
