import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import BottomTabsComponents from "./BottomTabs/BottomTabs";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <BottomTabsComponents></BottomTabsComponents>
            <StatusBar style="auto"/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
