import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import BottomTabs from "./BottomTabs/BottomTabs";

export default function App() {
  useEffect(() => {
    // getDelete();
  }, []);

  const getDelete = async () => {
    try {
      //  await AsyncStorage.removeItem("UserLanguage");
      await AsyncStorage.clear();

      console.log("this is remove");
    } catch (exception) {
      return false;
    }
  };

  return (
    <NavigationContainer style={styles.container}>
      <BottomTabs></BottomTabs>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
