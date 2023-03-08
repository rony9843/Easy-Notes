import AsyncStorage from "@react-native-async-storage/async-storage";

const GetUserValue = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('userNotes', jsonValue)

        console.log("save")

    } catch (error) {
        // Error saving data
        console.log("error for save ",error)
    }
}

export default GetUserValue