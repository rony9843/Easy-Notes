import AsyncStorage from "@react-native-async-storage/async-storage";

const SetLanguageLocal = async (lan = "english") => {
  try {
    await AsyncStorage.setItem("UserLanguage", lan);
    return true;
  } catch (error) {
    // Error saving data
    console.log("error for language ", error);
  }
};

export default SetLanguageLocal;
