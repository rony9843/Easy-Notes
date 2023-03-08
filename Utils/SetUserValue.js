import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUserValue from "./GetUserValue";

const SetUserValue = async (value) => {
  try {
    const time = new Date();

    const allNotes = await GetUserValue();

    if (allNotes === null) {
      // when old notes not found
      const obj = {
        userValue: value,
        id: Math.floor(100000000 + Math.random() * 900000000),
        time: time,
      };

      const payload = [obj];

      const jsonValue = JSON.stringify(payload);
      await AsyncStorage.setItem("userNotes", jsonValue);
    } else {
      // when notes found
      const obj = {
        userValue: value,
        id: Math.floor(100000000 + Math.random() * 900000000),
        time: time,
      };

      const payload = [obj, ...allNotes];

      const jsonValue = JSON.stringify(payload);
      await AsyncStorage.setItem("userNotes", jsonValue);
    }

    console.log("save");
  } catch (error) {
    // Error saving data
    console.log("error for save ", error);
  }
};

export default SetUserValue;
