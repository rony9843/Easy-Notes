import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteAllValue = async () => {
        try{
            await  AsyncStorage.removeItem("userNotes",()=>
                  {
                      console.log("deleted")
                  }
              )
        }catch (e) {

        }
}


export default DeleteAllValue;