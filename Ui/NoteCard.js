import { convert } from "html-to-text";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const NoteCard = ({ data, removeItem }) => {
  let userValue = convert(data.item.userValue, { wordwrap: 0 });
  userValue =
    userValue.length > 30 ? userValue.slice(0, 90) + "..." : userValue;

  const alertFunction = () => {
    Alert.alert(
      "Hold on!",
      `You have unsaved changes. Are you change and leave the screen?`,
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            removeItem(data.item.id);
          },
        },
      ]
    );

    return true;
  };

  return (
    <View>
      <View style={styles.boxContainer}>
        <View style={styles.textBoxContainer}>
          <Text>{userValue}</Text>
        </View>

        <TouchableOpacity
          onPress={() => alertFunction()}
          style={styles.deleteBoxContainer}
        >
          <IonIcon
            style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
            name={"trash"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  textBoxContainer: {
    flex: 10,
    marginRight: 10,
  },
  deleteBoxContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    maxHeight: 60,
    minHeight: 50,
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

export default NoteCard;
