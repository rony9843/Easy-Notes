import GetUserValue from "./GetUserValue";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveOneById = async (props) => {

    const findAllUser = await GetUserValue();

    const filterData = findAllUser.filter(note => note.id !== props)

    const jsonValue = JSON.stringify(filterData)
    await AsyncStorage.setItem('userNotes', jsonValue)

    return filterData;

}


export default RemoveOneById;