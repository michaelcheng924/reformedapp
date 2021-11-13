import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const Stack = createStackNavigator();

function StackNavigator({ theme }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerStyle: {
            backgroundColor: theme === "Dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "Dark" ? "#fff" : "#000",
        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(StackNavigator);
