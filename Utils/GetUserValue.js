import AsyncStorage from "@react-native-async-storage/async-storage";

const GetUserValue = async () => {

    try {
        const jsonValue = await AsyncStorage.getItem('userNotes')
        // return jsonValue != null ? JSON.parse(jsonValue) : null

        return jsonValue === null ?  [] : JSON.parse(jsonValue)
    } catch (e) {
        // error reading value
        return {
            msg : "error",
            err : e
        }
    }

}


export default GetUserValue;