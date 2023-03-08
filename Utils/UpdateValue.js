import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUserValue from "./GetUserValue";

const UpdateValue = async (value, id) => {
  const userAllValue = await GetUserValue();

  let filterNote = userAllValue.filter((dt) => dt.id !== id);

  const obj = {
    userValue: value,
    id: id,
    time: new Date(),
  };

  let payload = [obj, ...filterNote];

  const jsonValue = JSON.stringify(payload);

  await AsyncStorage.setItem("userNotes", jsonValue);
};

export default UpdateValue;
