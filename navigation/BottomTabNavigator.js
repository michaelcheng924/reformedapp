import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { connect } from "react-redux";

import TabBarIcon from "../components/TabBarIcon";
import SettingsScreen from "../screens/SettingsScreen";
import CatechismScreen from "../screens/CatechismScreen";
import CATECHISMS from "../constants/catechisms";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Catechism";

function BottomTabNavigator({ catechism, navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route, catechism) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Catechism"
        component={CatechismScreen}
        options={{
          title: "Catechism",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bubbles" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route, catechism) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  const selectedCatechism = CATECHISMS[Number(catechism)];

  switch (routeName) {
    case "Catechism":
      return selectedCatechism.title;
    case "Settings":
      return "Settings";
  }
}

const mapStateToProps = (state) => ({
  catechism: state.catechism,
});

export default connect(mapStateToProps)(BottomTabNavigator);
