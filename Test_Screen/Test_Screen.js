import React from "react";
import { Text, View } from "react-native";

const Test_Screen = ({ route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Test_Screen {route.name}</Text>
    </View>
  );
};

export default Test_Screen;
