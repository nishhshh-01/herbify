import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const [name, setName] = useState("Herbify User");
  const [email, setEmail] = useState("user@email.com");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/profile.png")}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.changePicBtn}>
          <Text style={styles.changePicText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F4FFF4", flex: 1, padding: 20 },
  header: { alignItems: "center", marginTop: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  changePicBtn: { marginTop: 8 },
  changePicText: { color: "#2E7D32", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f0f5f0",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
