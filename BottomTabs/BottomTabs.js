import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import SetLanguageLocal from "../Utils/SetLanguage";
import GetLanguage from "./../Utils/GetLanguage";
import BottomNotesComponents from "./BottomNotesComponents";
import BottomSettingComponents from "./BottomSettingComponents";

const Tab = createBottomTabNavigator();

// language create context
export const languageContext = createContext();

const BottomTabsComponents = () => {
  const [language, setLanguage] = useState();

  // * comment --->
  useEffect(() => {
    getLanguageFunc();
  }, []);

  // * comment --->
  useEffect(() => {
    SetLanguageLocal(language);
  }, [language]);

  const getLanguageFunc = async () => {
    setLanguage(await GetLanguage());
  };

  return (
    <languageContext.Provider value={[language, setLanguage]}>
      <Tab.Navigator
        screenOptions={{
          // when open keyboard auto hide bottom tab
          tabBarHideOnKeyboard: true,
          // tabBarStyle: {
          //   backgroundColor: "#F76C6A",
          // },
          tabBarActiveTintColor: "#F79E89",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          options={{
            title: `${language === "english" ? "Notes" : "নোট"} `,

            //   title: `Notes`,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View>
                  <IonIcon
                    style={{
                      fontSize: 20,
                      color: focused ? "#F79E89" : "gray",
                    }}
                    name={focused ? "document-text" : "document-text-outline"}
                  />
                </View>
              );
            },
            headerShown: false,
          }}
          name={"Notes"}
          component={BottomNotesComponents}
        />
        <Tab.Screen
          options={{
            title: ` ${language === "english" ? "Setting" : "সেটিং"} `,
            //   title: `Setting`,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View>
                  <IonIcon
                    style={{
                      fontSize: 20,
                      color: focused ? "#F79E89" : "gray",
                    }}
                    name={focused ? "settings" : "settings-outline"}
                  />
                </View>
              );
            },
            headerTintColor: "#F79E89",
            //  tabBarStyle: { display: "none" },
          }}
          name={"Setting"}
          component={BottomSettingComponents}
        />
      </Tab.Navigator>

      {/**   <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Test_Screen} />
        <Tab.Screen name="Setting" component={Test_Screen} />
      </Tab.Navigator> */}
    </languageContext.Provider>
  );
};

export default BottomTabsComponents;
