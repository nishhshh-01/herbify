// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Auth screens
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";

// Main screens
import HomeScreen from "./screens/HomeScreen";
import PlantDetailScreen from "./screens/PlantDetailScreen";
import MyGardenScreen from "./screens/MyGardenScreen";
import PlantGrowthScreen from "./screens/PlantGrowthScreen";
import AlertsScreen from "./screens/AlertsScreen";
import FiltersScreen from "./screens/FiltersScreen";

// Profile & settings
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import MyGardenStatsScreen from "./screens/MyGardenStatsScreen";
import Notifications from "./screens/Notifications";
import TutorialScreen from "./screens/TutorialScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SettingGarden from "./screens/SettingGarden";

// 🌿 New bonus feature
import AyurvedicQuizScreen from "./screens/AyurvedicQuizScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const loggedIn = await AsyncStorage.getItem("LOGGED_IN");
        setInitialRoute(loggedIn === "true" ? "Home" : "Welcome");
      } catch (e) {
        setInitialRoute("Welcome");
      }
    }
    checkLogin();
  }, []);

  if (!initialRoute) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8FFF8",
        }}
      >
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ marginTop: 12, color: "#555", fontSize: 16 }}>
          Loading your garden... 🌿
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        {/* Auth */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={CreateAccountScreen} />

        {/* Main */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
        <Stack.Screen name="MyGarden" component={MyGardenScreen} />
        <Stack.Screen name="PlantGrowth" component={PlantGrowthScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />

        {/* Profile & settings */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyGardenStats" component={MyGardenStatsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Setting" component={SettingGarden} />

        {/* 🌿 Bonus feature */}
        <Stack.Screen name="AyurvedicQuiz" component={AyurvedicQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
