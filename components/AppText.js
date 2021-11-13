import React from "react";
import { connect } from "react-redux";
import { Text } from "react-native";

const AppText = ({
  forceColor,
  theme,
  bold,
  children,
  color,
  font,
  size = 16,
  style,
}) => {
  return (
    <Text
      style={{
        color:
          (color
            ? theme === "Dark" && !forceColor
              ? "#b3e5fc"
              : color
            : color) || (theme === "Dark" ? "#fff" : "#4d5156"),
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

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(AppText);
