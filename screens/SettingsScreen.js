import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppText from "../components/AppText";

const FONTS = ["proxima-nova", "baskerville"];

const SettingsScreen = ({ font, setFont, setSize, size }) => {
  return (
    <View style={styles.settings}>
      <View
        style={[
          styles.controlItem,
          {
            borderColor: "#4d5156",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setFont("proxima-nova");
            setSize(16);
          }}
        >
          <AppText font={font}>Reset</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.controls}>
        <View
          style={[
            styles.controlItems,
            {
              marginRight: 40,
            },
          ]}
        >
          {FONTS.map((fontName, index) => {
            return (
              <View
                key={fontName}
                style={[
                  styles.controlItem,
                  {
                    borderColor: font === fontName ? "#9A51B0" : "#4d5156",
                    marginLeft: index === 0 ? 0 : 10,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setFont(fontName);
                  }}
                >
                  <AppText
                    color={font === fontName ? "#9A51B0" : ""}
                    font={font}
                  >
                    {fontName === "proxima-nova" ? "Sans-serif" : "Serif"}
                  </AppText>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.fontSizeControls}>
          <TouchableOpacity
            onPress={() => {
              if (size <= 70) {
                setSize(size + 1);
              }
            }}
          >
            <Entypo
              name="chevron-up"
              size={40}
              color="#4d5156"
              style={{
                position: "relative",
                top: 8,
              }}
            />
          </TouchableOpacity>
          <AppText font={font}>Font Size</AppText>
          <TouchableOpacity
            onPress={() => {
              if (size >= 10) {
                setSize(size - 1);
              }
            }}
          >
            <Entypo
              name="chevron-down"
              size={40}
              color="#4d5156"
              style={{
                position: "relative",
                top: -5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sample}>
        <View style={styles.sampleHeading}>
          <AppText bold font={font}>
            Sample Text
          </AppText>
        </View>
        <AppText font={font} size={size}>
          In the beginning was the Word, and the Word was with God, and the Word
          was God.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    width: `100%`,
  },
  controls: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -10,
    width: "100%",
  },
  controlItems: {
    display: "flex",
    flexDirection: "row",
  },
  controlItem: {
    borderRadius: 3,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  fontSizeControls: {
    alignItems: "center",
    display: "flex",
  },
  sample: {
    marginTop: 20,
  },
  sampleHeading: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  font: state.font,
  size: state.size,
});

const mapDispatchToProps = {
  setFont(font) {
    return {
      type: "SET_FONT",
      payload: {
        font,
      },
    };
  },
  setSize(size) {
    return {
      type: "SET_SIZE",
      payload: {
        size,
      },
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
