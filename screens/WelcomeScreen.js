import React from "react";
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={require("../assets/welcome_bg.png")}
        style={styles.bg}
      >
        
        <View style={styles.overlay} pointerEvents="none" />

        <View style={styles.content}>
          <Text style={styles.title}>Herbify 🌿</Text>
          <Text style={styles.subtitle}>
            Grow, learn and nurture your plants in a peaceful digital space ♥
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Auth")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
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
    width: "100%",
    height: "100%",
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
    fontSize: 45,
    fontWeight: "590",
    color: "#000",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 21,
    fontWeight: "500",
    color: "rgba(0,0,0,0.9)",
    marginTop: 10,
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
