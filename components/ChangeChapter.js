import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppText from "./AppText";

const ChangeChapter = ({
  chapterIndex,
  confession,
  font,
  setChapterIndex,
  setSelectChapter,
  size,
}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectConfession(false);
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
        {confession.content.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setChapterIndex(index);
                setSelectChapter(false);
              }}
            >
              <AppText
                bold
                color={chapterIndex === index ? "#9A51B0" : "#4d5156"}
                font={font}
                size={size + 4}
              >
                {item.title}
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
    alignItems: "center",
    display: "flex",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ChangeChapter;
