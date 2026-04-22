import React from "react";
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <ImageBackground
        source={require("../assets/welcome_bg.png")}
        style={styles.bg}
      >
        
        <View style={styles.overlay} pointerEvents="none" />

        <View style={styles.content}>
          
          <Text style={styles.title}>Welcome 👋</Text>
          <Text style={styles.subtitle}>
            Continue your herbal journey by logging in or creating a new account.
          </Text>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.secondaryText}>Create Account</Text>
          </TouchableOpacity>

        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    pointerEvents: "none", 
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  title: {
    color: "black",
    fontSize: 40,
    fontWeight: "800",
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.9)",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#2E7D32",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
  },
  primaryText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: "#2E7D32",
  },
  secondaryText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
