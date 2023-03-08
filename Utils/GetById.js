import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUserValue from "./GetUserValue";

const GetById = async (props) => {

    try {

        const findAllNotes = await GetUserValue()

        const findOne =  findAllNotes.find( note => note.id == props )


        return findOne

    }catch (e) {
        console.log(e)
    }

}


export default GetById;