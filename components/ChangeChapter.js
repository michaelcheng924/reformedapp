import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppText from "./AppText";

const ChangeChapter = ({
  chapterIndex,
  selectedConfession,
  font,
  setChapterIndex,
  setSelectChapter,
  size,
}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectChapter(false);
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
      <View style={styles.selectCatechism}>
        <AppText font={font} bold size={20}>
          Select Chapter
        </AppText>
        {selectedConfession.content.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setChapterIndex(index);
                setSelectChapter(false);
              }}
              style={{
                marginTop: 8,
              }}
            >
              <AppText
                bold={chapterIndex === index}
                color={chapterIndex === index ? "#9A51B0" : "#4d5156"}
                font={font}
                size={size + 4}
              >
                {item.chapter}. {item.title}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  selectCatechism: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default ChangeChapter;
