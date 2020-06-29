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

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Catechisms";

function BottomTabNavigator({ catechism, confession, navigation, route }) {
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
        }}
      />
      <BottomTab.Screen
        name="Confessions"
        component={ConfessionsScreen}
        options={{
          title: "Confessions",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="open-book" />;
          },
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
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route, catechism, confession) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  const selectedCatechism = CATECHISMS[Number(catechism)];
  const selectedConfession = CONFESSIONS[Number(confession)];

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
  catechism: state.catechism,
  confession: state.confession,
});

export default connect(mapStateToProps)(BottomTabNavigator);
