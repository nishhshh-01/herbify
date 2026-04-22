// screens/LoginScreen.js

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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    console.log("LOGIN PRESSED");

    if (!email.trim() || !password.trim()) {
      if (Platform.OS === "web") {
        window.alert("Please enter email and password.");
      } else {
        Alert.alert("Missing info", "Please enter email and password.");
      }
      return;
    }

    // mark logged in 
    try {
      await AsyncStorage.setItem("LOGGED_IN", "true");
    } catch (e) {
      console.log("Error saving login flag", e);
    }

    if (Platform.OS === "web") {
      window.alert("Logged in! Redirecting to Home...");
    } else {
      Alert.alert("Logged in", "Welcome back to your herbal garden!");
    }

   
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
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

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Log in to continue to your virtual herbal garden.
        </Text>

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
            placeholder="Your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.linkText}>New here?</Text>
          <Text style={[styles.linkText, { fontWeight: "700" }]}>
            {" "}
            Create an account
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
