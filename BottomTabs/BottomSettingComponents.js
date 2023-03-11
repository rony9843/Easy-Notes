import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { languageContext } from "./BottomTabs";

const BottomSettingComponents = () => {
  // ? context state
  const [language, setLanguage] = useContext(languageContext);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View>
          <Text style={styles.titleContainer}>
            {" "}
            {language === "english"
              ? "Change the language"
              : "ভাষা পরিবর্তন করুন"}
          </Text>
        </View>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            onPress={() => setLanguage("bangla")}
            style={
              language === "bangla"
                ? styles.ActiveOption
                : styles.DeactivateOption
            }
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>বাংলা</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLanguage("english")}
            style={
              language === "english"
                ? styles.ActiveOption
                : styles.DeactivateOption
            }
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>English</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  boxContainer: {
    backgroundColor: "#F79E89",
    padding: 20,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  titleContainer: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  languageContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  ActiveOption: {
    backgroundColor: "#d86950",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d86950",
  },

  DeactivateOption: {
    // backgroundColor: "#fac6bb",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fac6bb",
  },
});

export default BottomSettingComponents;
