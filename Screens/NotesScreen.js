import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import IonIcon from "react-native-vector-icons/Ionicons";
import { UserInfoContext } from "../BottomTabs/BottomNotesComponents";
import NoteCard from "../Ui/NoteCard";
import GetUserValue from "../Utils/GetUserValue";
import RemoveOneById from "../Utils/RemoveOneById";

const NotesScreen = ({ navigation, route }) => {
  // ? context state
  const [contextCard, setContextCard] = useContext(UserInfoContext);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // DeleteAllValue()

    const fetchData = GetUserValue();
    fetchData.then((data) => {
      setNotes(data === null ? [] : data);
    });
  }, [navigation, route.params]);

  const removeItem = async (id) => {
    const allItem = await RemoveOneById(id);
    setNotes(allItem);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesCardContainer}>
        <FlatList
          data={notes}
          renderItem={(data) => (
            <Pressable
              style={styles.notesCardBoxContainer}
              android_ripple={{ color: "#F76C6A" }}
              onPress={() =>
                navigation.navigate("Add Note", {
                  mode: "edit",
                  id: data.item.id,
                })
              }
            >
              <NoteCard removeItem={removeItem} data={data}></NoteCard>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ position: "absolute", bottom: 40, right: 40 }}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          direction="alternate"
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Add Note", { mode: "not edit", id: false })
            }
            style={styles.addNotesBtnContainer}
          >
            <View>
              <IonIcon
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                name={"add"}
              />
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#E5E5E5",
    padding: 2,
  },
  addNotesBtnContainer: {
    backgroundColor: "#F76C6A",
    padding: 18,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  notesCardContainer: {
    //backgroundColor: "#F79E89",
  },
  notesCardBoxContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#F79E89",
    borderRadius: 5,
    marginVertical: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default NotesScreen;
