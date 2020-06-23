import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import reducer from "./reducer";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

const store = createStore(
  reducer,
  typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadFonts = () => {
    return Promise.all([
      Font.loadAsync({
        "proxima-nova": require("./assets/fonts/proxima-nova-regular.ttf"),
        "proxima-nova-bold": require("./assets/fonts/proxima-nova-bold.otf"),
        baskerville: require("./assets/fonts/baskerville-regular.ttf"),
        "baskerville-bold": require("./assets/fonts/baskerville-bold.otf"),
      }),
    ]).then(() => {
      setIsLoadingComplete(true);
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <Provider store={store}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
