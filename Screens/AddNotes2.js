import React, {useContext, useEffect, useState} from "react";
import {
    Platform,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    BackHandler,
    Alert,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetUserValue from "../Utils/SetUserValue";
import GetUserValue from "../Utils/GetUserValue";
import {UserInfoContext} from "../BottomTabs/BottomNotesComponents";
import GetById from "../Utils/GetById";
import UpdateValue from "../Utils/UpdateValue";
import updateValue from "../Utils/UpdateValue";
import {CommonActions} from "@react-navigation/native";

const {convert} = require('html-to-text');


const AddNotes2 = ({navigation, route}) => {


    // ? context state
    const [contextCard, setContextCard] = useContext(UserInfoContext);


    const [userInput, setUserInput] = useState("");
    const [userOldInput, setUserOldInput] = useState("");



    const richText = React.createRef() || React.useRef();


    // get old note by id if router mode "edit"
    useEffect(() => {

        if (route.params.mode === "edit" && route.params.id !== false) {
            fetchDataFromLocal()
        }

    }, [route.params.mode]);

    const fetchDataFromLocal = async () => {

        const findOne = await GetById(route.params.id)
        setUserOldInput(findOne.userValue)
        setUserInput(findOne.userValue)

    }


    // hide and show bottom tabs
    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                display: "none"
            }
        })

        return () => {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    display: "flex"
                }
            })
        }


    }, [])

    let saveMode = true;

    let hasUnsavedChanges = false
    // let hasUnsavedChanges =  ? true : userOldInput === userInput  ;
    //const hasUnsavedChanges = Boolean(1)  ;

    if (userOldInput === "" && saveMode === (route.params.mode === "edit")) {
        hasUnsavedChanges = true
        console.log("this is 1 -> ", route.params.mode === "edit")
    } else if (userOldInput === userInput) {
        hasUnsavedChanges = true
        console.log("this is 2 -> ", route.params.mode === "edit")
    }


    const saveModeFilter = () => {
        return route.params.mode === "edit"
    }

    const backAction = () => {
        Alert.alert('Hold on!', `${hasUnsavedChanges} Are you sure you want to go back?`, [{
            text: 'Cancel', onPress: () => null, style: 'cancel',
        }, {text: 'YES', onPress: () =>
                navigation.navigate("Notes Screen",[{
                    mode : "off",
                }])
            // BackHandler.exitApp()

        },]);
        return true;
    };

    // useEffect(() => {
    //
    //     //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction,);
    //
    //         if (hasUnsavedChanges && saveMode) {
    //
    //             setContextCard(Math.floor(100000000 + Math.random() * 900000000))
    //            return backHandlerFunc(backAction)
    //             // return;    // goto screen note page
    //
    //         }
    //
    //     backHandlerFunc(backAction)
    //
    //     //  return () => backHandler.remove();
    // }, []);

    const backHandlerFunc = (backAction) => {
        BackHandler.addEventListener('hardwareBackPress', backAction,);
    }


    // const hasUnsavedChanges = Boolean(userInput);


    // useEffect(() => navigation.addListener('beforeRemove', (e) => {
    //
    //     const action = e.data.action;
    //     console.log(saveMode, " + this is old vs new data -> ", hasUnsavedChanges)
    //     if (hasUnsavedChanges && saveMode) {
    //
    //         setContextCard(Math.floor(100000000 + Math.random() * 900000000))
    //         return;    // goto screen note page
    //
    //     }
    //
    //     e.preventDefault();
    //
    //
    //     clickToBackBtn(action)
    //
    //
    // }), [hasUnsavedChanges, navigation]);


    // for click to back btn
    const clickToBackBtn = (action) => {
        console.log(action)
        Alert.alert('Discard changes?', `${saveMode} - ${hasUnsavedChanges}You have unsaved changes. Are you sure to discard them and leave the screen?`, [{
            text: "No", style: 'cancel', onPress: () => {
                navigation.dispatch(action)
            }
        }, {
            text: 'Yes', style: "destructive", onPress: async () => {
                // route.params.mode === "edit" ? await UpdateValue(userInput,route.params.id) : await SetUserValue(userInput)
                setContextCard(Math.floor(100000000 + Math.random() * 900000000))

              // navigation.dispatch(action.)
                navigation.dispatch(action)

                // navigation.dispatch(
                //     CommonActions.navigate({
                //         name: 'Notes Screen',
                //         params: {
                //             mode : "update",
                //             value : userInput,
                //             id : route.params.id,
                //         },
                //     })
                // );

                navigation.navigate("Notes Screen",[{
                    mode : "off",
                }])
                navigation.dispatch(action)

            },

        },]);
    }

    // new data save
    const saveItem =  () => {
        if (!userInput.length === false) {
            saveMode = saveModeFilter()
            navigation.navigate("Notes Screen",[{
                mode : "newValue",
                value : userInput,}])
        } else {
            navigation.navigate("Notes Screen",[{
                mode : "off",
            }])
        }

    }

    // update data
    const updateItem =  () => {
        if (!userInput.length === false) {
            saveMode = saveModeFilter()
            navigation.navigate("Notes Screen",[{
                mode : "update",
                value : userInput,
                id : route.params.id,
            }])
        }else if(userOldInput === userInput){
            navigation.navigate("Notes Screen"[{
                mode : "off",
            }])
        }
        else {
            navigation.navigate("Notes Screen",[{
                mode : "off",
            }])
        }
    }


    return (

        <SafeAreaView>
            <View>
                <View style={styles.headerContainer}>
                    <View>
                        <TouchableOpacity>
                            <Text onPress={() => {
                                saveMode = saveModeFilter() ? updateItem() : navigation.navigate("Notes Screen")
                            }}>
                                Back
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity>
                        <View>
                            {
                                saveModeFilter() ?
                                    <Text onPress={() => updateItem()}>
                                        Update
                                    </Text>
                                    :
                                    <Text onPress={() => saveItem()}>
                                        Save
                                    </Text>
                            }

                        </View>
                    </TouchableOpacity>


                </View>


                <RichToolbar
                    actions={[actions.keyboard, actions.undo, actions.redo, actions.checkboxList, actions.setBold, actions.removeFormat, actions.setStrikethrough, actions.setUnderline, actions.insertLink, actions.setItalic, actions.insertBulletsList, actions.insertOrderedList, 'customAction',]}
                    editor={richText}/>
                <ScrollView>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                          style={{flex: 1, paddingBottom: 100}}>

                        <View style={{paddingBottom: 600, flex: 1}}>
                            <RichEditor
                                //style={{   paddingBottom: userInput.length > 200 ? 200 : 0}}
                                //style={{   marginBottom: 100 }}
                                // // disabled={true}
                                initialContentHTML={userInput}
                                ref={richText}
                                initialHeight={100}
                                onChange={descriptionText => {
                                    setUserInput(descriptionText);

                                }}
                            />
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>


            </View>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    headerContainer: {
        padding: 20, flexDirection: "row", justifyContent: "space-between", backgroundColor: "red", marginTop: 20
    }
})


export default AddNotes2