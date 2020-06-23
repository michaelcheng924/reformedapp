import React from "react";
import { Text } from "react-native";

const AppText = ({ bold, children, color, font, size, style }) => {
  return (
    <Text
      style={{
        color: color || "#4d5156",
        fontFamily: `${font}${bold ? "-bold" : ""}`,
        fontSize: size || 16,
        lineHeight: size + size / 2,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default AppText;
