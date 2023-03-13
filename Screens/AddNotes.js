import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import {
//   actions,
//   RichEditor,
//   RichToolbar,
// } from "react-native-pell-rich-editor";
import IonIcon from "react-native-vector-icons/Ionicons";
import { UserInfoContext } from "../BottomTabs/BottomNotesComponents";
import { languageContext } from "../BottomTabs/BottomTabs";
import GetById from "../Utils/GetById";
import UpdateValue from "../Utils/UpdateValue";
import SetUserValue from "./../Utils/SetUserValue";

// const { convert } = require("html-to-text");

const AddNotes = ({ navigation, route }) => {
  // ? context state
  const [_, setContextCard] = useContext(UserInfoContext);
  const [language, setLanguage] = useContext(languageContext);

  const [userInput, setUserInput] = useState("");
  const [userOldInput, setUserOldInput] = useState("");
  const [mode, setMode] = useState(route.params.mode === "edit" ? true : false);
  const [userId, setUserId] = useState(route.params.id);
  let isAlert = true;

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

  // navigate screen stack
  const navigateScreenStack = () => {
    navigation.navigate("Notes Screen");
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

  const alertFunction = () => {
    Alert.alert(
      `${language === "english" ? "Hold on!" : "দয়া করে থামুন!!!"}`,
      `${
        language === "english"
          ? "You have unsaved changes. Are you change and leave the screen?"
          : `আপনি কিছু লেখা যুক্ত করেছেন । আপনি কি এটি ${
              mode === true ? "আপডেট" : "সেভ"
            } করতে চান?`
      }`,
      [
        {
          text: `${language === "english" ? "Cancel" : "না"}`,
          onPress: () => {
            // navigation.navigate("Notes Screen", [
            //   {
            //     random: Math.floor(10 + Math.random() * 90),
            //     update: false,
            //     userId: userId,
            //   },
            // ]);

            console.log("this is def alert");

            isAlert = false;
            navigateScreenStack();
          },
          style: "cancel",
        },
        {
          text: `${
            language === "english"
              ? "YES"
              : `হ্যাঁ, ${mode === true ? "আপডেট" : "সেভ"} করতে চাই`
          }`,
          onPress: () => {
            isAlert = false;
            mode === false ? saveItem() : updateFunctionCall();

            // navigation.navigate("Notes Screen", [
            //   {
            //     userId: userId,
            //     random: Math.floor(10 + Math.random() * 90),
            //     update: true,
            //   },
            // ]);
          },
        },
      ]
    );

    return true;
  };

  const alertFunctionForBackBtn = (value, userId) => {
    Alert.alert(
      `${language === "english" ? "Hold on!" : "দয়া করে থামুন!!!"}`,
      `${
        language === "english"
          ? "You have unsaved changes. Are you change and leave the screen?"
          : `আপনি কিছু লেখা যুক্ত করেছেন । আপনি কি এটি ${
              mode === true ? "আপডেট" : "সেভ"
            } করতে চান?`
      }`,
      [
        {
          text: `${language === "english" ? "Cancel" : "না"}`,
          onPress: () => {
            // navigation.navigate("Notes Screen", [
            //   {
            //     random: Math.floor(10 + Math.random() * 90),
            //     update: false,
            //     userId: userId,
            //   },
            // ]);
            console.log("this is back alert");
            isAlert = false;
            navigateScreenStack();
          },
          style: "cancel",
        },
        {
          text: `${
            language === "english"
              ? "YES"
              : `হ্যাঁ, ${mode === true ? "আপডেট" : "সেভ"} করতে চাই`
          }`,
          onPress: () => {
            isAlert = false;

            mode === false
              ? saveItem(value)
              : updateFunctionCall(value, userId);

            // navigation.navigate("Notes Screen", [
            //   {
            //     userId: userId,
            //     random: Math.floor(10 + Math.random() * 90),
            //     update: true,
            //   },
            // ]);
          },
        },
      ]
    );

    return true;
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (isAlert === false) {
          console.log("back alert 1", isAlert);
          return;
        }

        e.preventDefault();

        if (userInput !== userOldInput && userInput !== "") {
          alertFunctionForBackBtn(userInput, userId);
        }

        if (mode === true) {
          if (userInput === userOldInput) {
            console.log("back alert 1", isAlert);
            isAlert = false;
            navigateScreenStack();
            return;
          }
        } else {
          if (userInput === "") {
            console.log("back alert 1", isAlert);
            isAlert = false;
            navigateScreenStack();
            return;
          }
        }
      }),
    [userInput, navigation, userId, isAlert]
  );

  // * save user input
  const saveItem = async (value = userInput) => {
    if (!value.length === false) {
      await SetUserValue(value);
    }

    isAlert = false;

    navigateScreenStack();
  };

  // * user input update
  const updateAndBack = async () => {
    if (!userInput.length === false && userInput !== userOldInput) {
      await alertFunction();
    }

    isAlert = false;
    userInput === userOldInput && navigateScreenStack();
  };

  const updateFunctionCall = async (value = userInput, userId = userId) => {
    await UpdateValue(value, userId);

    navigateScreenStack();
  };

  // normal mode
  const goBack = () => {
    if (!userInput.length === false) {
      return alertFunction();
    }

    console.log("go back 1", isAlert);

    isAlert = false;
    console.log("go back 2 ", isAlert);

    navigateScreenStack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View>
        <View style={styles.headerContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                mode === true ? updateAndBack() : goBack();
              }}
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <IonIcon
                  style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
                  name={"chevron-back-outline"}
                />
              </View>

              <Text>{language === "english" ? "Back" : "পিছে"}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.headerSaveBtn}
            onPress={() => {
              mode ? updateAndBack() : saveItem();
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {mode
                ? ` ${language === "english" ? "Update" : "আপডেট"}`
                : `${language === "english" ? "Save" : "সেভ"}`}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "gray",
            flex: 1,
            width: "100%",
            borderBottomColor: "gray",
            borderWidth: 0.2,
            opacity: 0.5,
          }}
        ></View>

        <View>
          {/**  <RichToolbar
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
              </ScrollView> */}
        </View>

        <View style={{ flex: 1, minHeight: 400, maxHeight: 500 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View>
              <ScrollView>
                <TextInput
                  editable
                  multiline
                  autoFocus={true}
                  placeholder={
                    language === "english" ? "Typing..." : "লিখুন..."
                  }
                  numberOfLines={7}
                  onChangeText={(text) => setUserInput(text)}
                  value={userInput}
                  style={{
                    fontSize: 20,
                    padding: 10,
                    backgroundColor: "#F79E89",
                  }}
                />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>

        <View>
          {/**
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback>
            <View style={styles.inner}>
              <Text style={styles.header}>Header</Text>
              <TextInput
                multiline
                numberOfLines={9}
                onChangeText={(text) => setUserInput(text)}
                value={userInput}
                placeholder="Username"
                style={styles.textInput}
              />
              <View style={styles.btnContainer}>
                <Button title="Submit" onPress={() => null} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS !== "ios" ? 10 : 0,
    paddingBottom: 10,
  },

  headerSaveBtn: {
    backgroundColor: "#01C851",
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
  },

  container: {},
  inner: {
    padding: 10,
    minHeight: 300,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 90,
    color: "red",
  },
  textInput: {
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default AddNotes;
