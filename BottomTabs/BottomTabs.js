import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import BottomNotesComponents from "./BottomNotesComponents";
import BottomSettingComponents from "./BottomSettingComponents";

const Tab = createBottomTabNavigator();

const BottomTabsComponents = () => {
  return (
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
          title: "Notes",

          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View>
                <IonIcon
                  style={{ fontSize: 20, color: focused ? "#F79E89" : "gray" }}
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
          title: "Setting",
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View>
                <IonIcon
                  style={{ fontSize: 20, color: focused ? "#F79E89" : "gray" }}
                  name={focused ? "settings" : "settings-outline"}
                />
              </View>
            );
          },
          // tabBarStyle : {display : "none"}
        }}
        name={"Setting"}
        component={BottomSettingComponents}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsComponents;
