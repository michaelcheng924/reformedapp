import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import TabBarIcon from "../components/TabBarIcon";
import SettingsScreen from "../screens/SettingsScreen";
import CatechismScreen from "../screens/CatechismScreen";
import ConfessionsScreen from "../screens/ConfessionsScreen";
import AboutScreen from "../screens/AboutScreen";
import CATECHISMS from "../constants/catechisms";
import CONFESSIONS from "../constants/confessions";
import CREEDS from "../constants/creeds";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Catechisms";

function BottomTabNavigator({
  theme,
  catechism,
  confession,
  navigation,
  route,
}) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route, catechism, confession),
  });

  useEffect(() => {
    try {
      AsyncStorage.getItem("PAGE").then((r) => {
        if (r) {
          navigation.navigate(r);
        }
      });
    } catch (error) {}
  }, []);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Catechisms"
        component={CatechismScreen}
        options={{
          title: "Catechisms",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="bubbles" />;
          },
          headerStyle: {
            backgroundColor: theme === "Dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "Dark" ? "#fff" : "#000",
        }}
      />
      <BottomTab.Screen
        name="Confessions"
        component={ConfessionsScreen}
        options={{
          title: "Read",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="open-book" />;
          },
          headerStyle: {
            backgroundColor: theme === "Dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "Dark" ? "#fff" : "#000",
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="format-font" />;
          },
          headerStyle: {
            backgroundColor: theme === "Dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "Dark" ? "#fff" : "#000",
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="info" />;
          },
          headerStyle: {
            backgroundColor: theme === "Dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "Dark" ? "#fff" : "#000",
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route, catechism, confession) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  const selectedCatechism = CATECHISMS[Number(catechism)];
  let selectedConfession = CONFESSIONS[Number(confession)];

  if (confession.indexOf("CATECHISM") !== -1) {
    selectedConfession = CATECHISMS[Number(confession.split("_")[1])];
  } else if (confession.indexOf("CREED") !== -1) {
    selectedConfession = CREEDS[Number(confession.split("_")[1])];
  }

  switch (routeName) {
    case "Catechisms":
      return selectedCatechism.title;
    case "Confessions":
      return selectedConfession.title;
    case "Settings":
      return "Settings";
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme,
  catechism: state.catechism,
  confession: state.confession,
});

export default connect(mapStateToProps)(BottomTabNavigator);
