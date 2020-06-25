import {
  Entypo,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  let Component = SimpleLineIcons;

  if (props.name === "format-font") {
    Component = MaterialCommunityIcons;
  } else if (props.name === "open-book") {
    Component = Entypo;
  } else if (props.name === "info") {
    Component = Octicons;
  }

  return (
    <Component
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
