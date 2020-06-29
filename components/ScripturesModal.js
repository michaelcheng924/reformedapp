import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

import AppText from "../components/AppText";

const ScripturesModal = ({ font, setScriptures, size, scriptures }) => {
  return (
    <Modal
      isVisible={!!scriptures}
      onBackdropPress={() => {
        setScriptures(null);
      }}
    >
      <ScrollView
        style={styles.scripturesModal}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setScriptures(null);
          }}
        >
          <Entypo
            color="#489D89"
            name="cross"
            size={30}
            style={{
              textAlign: "right",
            }}
          />
        </TouchableOpacity>
        {isEmpty(scriptures) ? (
          <AppText font={font} size={size}>
            There is no data to display. Maybe you're not connected to the
            internet, or there is a problem with the Scripture reference.
          </AppText>
        ) : (
          <View>
            <View
              style={{
                borderBottomColor: "#e0e0e0",
                borderBottomWidth: 1,
                marginBottom: 20,
                paddingBottom: 10,
              }}
            >
              <AppText font={font} size={size}>
                {scriptures.text}
              </AppText>
            </View>
            {map(scriptures.scriptures, (item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: index === 0 ? 0 : 20,
                  }}
                >
                  <AppText bold font={font} size={size + 4}>
                    {item.scripture}
                  </AppText>
                  {item.results &&
                    item.results.map((item1, index1) => {
                      return (
                        <View key={index1}>
                          {item.results.length > 1 ? (
                            <View
                              style={{
                                marginTop: 10,
                              }}
                            >
                              <AppText bold font={font} size={size - 2}>
                                Chapter {item1.chapter}
                              </AppText>
                            </View>
                          ) : null}
                          <AppText font={font} size={size}>
                            {item1.verses &&
                              item1.verses.map((verse, index2) => {
                                return (
                                  <AppText key={index2} font={font} size={size}>
                                    <AppText bold font={font} size={size - 4}>
                                      {verse.verse}
                                    </AppText>{" "}
                                    <AppText font={font} size={size}>
                                      {`${verse.text} `}
                                    </AppText>
                                  </AppText>
                                );
                              })}
                          </AppText>
                        </View>
                      );
                    })}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scripturesModal: {
    backgroundColor: "#fff",
    flex: 1,
    maxHeight: "80%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    position: `relative`,
  },
  contentContainer: {
    paddingBottom: 30,
  },
});

export default ScripturesModal;
