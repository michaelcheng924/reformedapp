import { Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  let Component = SimpleLineIcons;

  if (props.name === "settings") {
    Component = Feather;
  } else if (props.name === "open-book") {
    Component = Entypo;
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
