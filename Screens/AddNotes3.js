import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { UserInfoContext } from "../BottomTabs/BottomNotesComponents";
import GetById from "../Utils/GetById";
import SetUserValue from "../Utils/SetUserValue";

const { convert } = require("html-to-text");

const AddNotes3 = ({ navigation, route }) => {
  // ? context state
  const [contextCard, setContextCard] = useContext(UserInfoContext);

  const [userInput, setUserInput] = useState("");
  const [userOldInput, setUserOldInput] = useState("");
  const [mode, setMode] = useState(
    route.params.mode === "edit" ? "edit" : false
  );
  const [userId, setUserId] = useState(route.params.id);

  const richText = React.createRef() || React.useRef();

  // get old note by id if router mode "edit"
  useEffect(() => {
    if (route.params.mode === "edit" && route.params.id !== false) {
      fetchDataFromLocal();
    }
  }, [route.params.mode]);

  // call fetch data form local
  const fetchDataFromLocal = async () => {
    const findOne = await GetById(route.params.id);
    setUserOldInput(findOne.userValue);
    setUserInput(findOne.userValue);
  };

  // hide and show bottom tabs
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, []);

  const isValidInput = !userInput.length; // "" -> true || false
  const backHandlerFunc = (userInput) => {
    // mode === "edit" && userOldInput !== userInput && !userOldInput.length === false && BackHandler.addEventListener('hardwareBackPress', backAction);

    BackHandler.addEventListener("hardwareBackPress", backAction);

    // if ( mode === "edit") {
    //     if (userOldInput !== userInput) {
    //         backAction()
    //     }
    // }
    // if (mode !== "edit") {
    //     if (!userInput.length === false) {
    //         console.log("innn")
    //         backAction()
    //     }
    //
    // }
  };

  const isChanges = Boolean(userOldInput !== userInput);

  const backAction = () => {
    if (mode === "edit" && isChanges) {
      alertFunc();
    } else {
      console.log("userInput -> ", isValidInput);
      console.count("this is others 444 ", isValidInput);
      alertFunc();
    }
  };

  const alertFunc = () => {
    console.log(route.name);

    Alert.alert(
      "Hold on!",
      `You have unsaved changes. Are you change and leave the screen?`,
      [
        {
          text: "Cancel",
          onPress: () => {
            navigation.navigate("Notes Screen", [
              {
                random: Math.floor(10 + Math.random() * 90),
                update: false,
                userId: userId,
              },
            ]);
          },
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            navigation.navigate("Notes Screen", [
              {
                userId: userId,
                random: Math.floor(10 + Math.random() * 90),
                update: true,
              },
            ]);
          },
        },
      ]
    );

    return true;
  };

  useEffect(() => {
    // userInput.length === false && backHandlerFunc(userInput);
    // if (mode === "edit") {
    //   if (!userInput.length === false && userOldInput !== userInput) {
    //     BackHandler.addEventListener("hardwareBackPress", alertFunc());
    //   }
    // } else {
    //   //    !userInput.length && alertFunc();
    //   BackHandler.addEventListener("hardwareBackPress", alertFunc());
    // }
    // if (!userInput.length) {
    //   BackHandler.addEventListener("hardwareBackPress", alertFunc);
    // }
    // return () => {
    //   if (!userInput.length) {
    //     BackHandler.addEventListener("hardwareBackPress", alertFunc);
    //   }
    // };
  }, []);

  // update and back btn
  const updateAndBack = () => {
    // normal mode
    if (mode !== "edit") {
      // text = ""
      if (!userInput.length !== false) {
        navigation.navigate("Notes Screen", [
          {
            mode: "off",
          },
        ]);
      } else {
        return alertFunc();
      }
    } else {
      if (!userInput.length === false) {
        console.log("this is back -->>");
        //  backAction();
        !userInput.length === false && userInput !== userOldInput
          ? alertFunc()
          : navigation.navigate("Notes Screen", [
              {
                mode: "off",
              },
            ]);
      }
    }
  };

  const saveItem = async () => {
    if (!userInput.length === false) {
      await SetUserValue(userInput);

      navigation.navigate("Notes Screen", [
        {
          mode: "newValue",
          value: userInput,
        },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.headerContainer}>
          <View>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  updateAndBack();
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View>
              {mode === "edit" ? (
                <Text onPress={() => updateAndBack()}>Update</Text>
              ) : (
                <Text onPress={() => saveItem()}>Save</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <RichToolbar
          actions={[
            actions.keyboard,
            actions.undo,
            actions.redo,
            actions.checkboxList,
            actions.setBold,
            actions.removeFormat,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.insertLink,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            "customAction",
          ]}
          editor={richText}
        />
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, paddingBottom: 100 }}
          >
            <View style={{ paddingBottom: 600, flex: 1 }}>
              <RichEditor
                //style={{   paddingBottom: userInput.length > 200 ? 200 : 0}}
                //style={{   marginBottom: 100 }}
                // // disabled={true}
                initialContentHTML={userInput}
                ref={richText}
                initialHeight={100}
                onChange={(descriptionText) => {
                  setContextCard({
                    newUserValue: descriptionText,
                  });
                  setUserInput(descriptionText);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    marginTop: 20,
  },
});

export default AddNotes3;
