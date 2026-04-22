import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FFF8" }}>
      <ScrollView contentContainerStyle={styles.container}>

     
        <View style={styles.center}>
          <Image
            source={require("../assets/profile.png")} //image
            style={styles.profileImg}
          />
          <Text style={styles.name}>Herbify User</Text>
          <Text style={styles.email}>user@email.com</Text>
        </View>

       
       

          <TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("EditProfile")}>
  <Text style={styles.optionText}>Edit Profile</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("MyGardenStats")}>
  <Text style={styles.optionText}>My Garden Stats</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("NotificationsPage")}>
  <Text style={styles.optionText}>Notifications</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("Tutorial")}>
  <Text style={styles.optionText}>Herbify Tutorial</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("Settings")}>
  <Text style={styles.optionText}>App Settings</Text>
</TouchableOpacity>


      
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },

  center: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    marginTop:25,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D32",
  },

  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  section: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    elevation: 3,
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1B5E20",
  },

  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 14,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
