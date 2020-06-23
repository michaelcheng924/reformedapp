import React from "react";
import { TextInput } from "react-native";

const AppText = ({
  bold,
  color,
  font,
  placeholder,
  setValue,
  size,
  style,
  value,
}) => {
  return (
    <TextInput
      onChangeText={(text) => setValue(text)}
      multiline
      placeholder={placeholder}
      style={{
        borderWidth: 1,
        borderColor: "#4d5156",
        color: color || "#4d5156",
        fontFamily: `${font}${bold ? "-bold" : ""}`,
        fontSize: size || 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        ...style,
      }}
      value={value}
    />
  );
};

export default AppText;
