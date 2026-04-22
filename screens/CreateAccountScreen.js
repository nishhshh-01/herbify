// screens/CreateAccountScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    console.log("SIGNUP PRESSED");

    if (!name.trim() || !email.trim() || !password.trim()) {
      if (Platform.OS === "web") {
        window.alert("Please fill all fields.");
      } else {
        Alert.alert("Missing info", "Please fill all fields.");
      }
      return;
    }

    // Yaha se main kaam: directly Login pe bhej denge
    if (Platform.OS === "web") {
      window.alert("Account created! You can now log in.");
    } else {
      Alert.alert("Account created", "You can now log in.");
    }

    // navigation ko Alert ke andar onPress me MAT rakh
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#1B5E20" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Sign up to save your herbal garden and preferences.
        </Text>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSignup}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Already have an account?</Text>
          <Text style={[styles.linkText, { fontWeight: "700" }]}>
            {" "}
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#F8FFF8",
  },
  backBtn: {
    padding: 4,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B5E20",
  },
  subtitle: {
    color: "#555",
    marginTop: 4,
    marginBottom: 20,
  },
  inputWrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: "#33691E",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C8E6C9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  linkRow: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "center",
  },
  linkText: {
    color: "#2E7D32",
    fontSize: 14,
  },
});
