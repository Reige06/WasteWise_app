import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const [binStatus, setBinStatus] = useState({ bio: "empty", nonBio: "empty" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchBinStatus = async () => {
      try {
        const response = await fetch(
          "https://capstone-backend-3loo.onrender.com/api/bin-status/latest/"
        );
        const data = await response.json();
        console.log("Backend data:", data);

        // Update frontend state based on backend
        setBinStatus({
          bio: data.bio_status?.toLowerCase() === "full" ? "full" : "empty",
          nonBio: data.non_bio_status?.toLowerCase() === "full" ? "full" : "empty",
        });
      } catch (err) {
        console.error("Error fetching bin status:", err);
        setBinStatus({ bio: "empty", nonBio: "empty" });
      } finally {
        setLoading(false);
      }
    };

    fetchBinStatus(); // fetch immediately
    intervalId = setInterval(fetchBinStatus, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const isDesktop = width >= 720;

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#2E7D32" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headertxt}>WASTEWISE</Text>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text>Loading bin status...</Text>
        </View>
      ) : (
        <View
          style={[styles.cards, { flexDirection: isDesktop ? "row" : "column" }]}
        >
          <View style={styles.bio}>
            <Text style={styles.statusText}>
              {binStatus.bio === "full" ? "Full" : "Empty"}
            </Text>
            <Entypo name="trash" size={170} color="#4B5563" />
            <Text style={styles.cardtxt}>Biodegradable</Text>
          </View>

          <View style={styles.recyclable}>
            <Text style={styles.statusText}>
              {binStatus.nonBio === "full" ? "Full" : "Empty"}
            </Text>
            <Entypo name="trash" size={170} color="#4B5563" />
            <Text style={styles.cardtxt}>Non Biodegradable</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    padding: 16,
  },
  headertxt: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
  },
  cards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bio: {
    height: 270,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CDE8D5",
    borderColor: "#81C784",
    borderWidth: 2,
    borderRadius: 8,
    elevation: 5,
    margin: 10,
  },
  recyclable: {
    height: 270,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    borderColor: "#4FC3F7",
    borderWidth: 2,
    borderRadius: 8,
    elevation: 5,
    margin: 10,
  },
  cardtxt: {
    fontWeight: "700",
    fontSize: 23,
    color: "#4B5563",
  },
  statusText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
