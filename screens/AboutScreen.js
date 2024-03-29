import React from "react";
import { connect } from "react-redux";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "../components/AppText";

const SettingsScreen = ({ theme, font, setFont, setSize, size }) => {
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme === "Dark" ? "#000" : "#fff",
      }}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <AppText font={font} size={size}>
          Hello, and thanks for checking out my app! I'm just someone who enjoys
          building projects in his spare time. To learn more about me and my
          projects, visit the link below.
        </AppText>
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://reformedwiki.com/about/");
            }}
          >
            <View style={styles.button}>
              <AppText color="#489D89" font={font} size={size}>
                ReformedWiki - About
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <AppText font={font} size={size}>
          To let me know about a bug, feature request, or any other suggestion,
          visit the link below.
        </AppText>
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://reformedwiki.com/support/");
            }}
          >
            <View style={styles.button}>
              <AppText color="#489D89" font={font} size={size}>
                ReformedWiki - Support
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  button: {
    borderColor: "#489D89",
    borderRadius: 3,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme,
  font: state.font,
  size: state.size,
});

export default connect(mapStateToProps)(SettingsScreen);
