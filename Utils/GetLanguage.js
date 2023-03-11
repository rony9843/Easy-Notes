import AsyncStorage from "@react-native-async-storage/async-storage";
import SetLanguage from "./SetLanguage";

const getLanguageFunc = async () => {
  let jsonValue = await AsyncStorage.getItem("UserLanguage");

  return jsonValue;
};

const GetLanguage = async () => {
  try {
    let language = await getLanguageFunc();

    if (language === null) {
      await SetLanguage();

      return "english";
    }

    return language;
  } catch (e) {
    console.log("Language error  ", e);
  }
};

export default GetLanguage;
