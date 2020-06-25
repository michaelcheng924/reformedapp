import React from "react";
import { Slider, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Navigation = ({
  catechismIndex,
  selectedCatechism,
  setCatechismIndex,
}) => {
  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        onPress={() => {
          if (catechismIndex > 0) {
            setCatechismIndex(catechismIndex - 1);
          }
        }}
      >
        <Entypo
          name="chevron-left"
          size={40}
          color={catechismIndex === 0 ? "#bdbdbd" : "#489D89"}
        />
      </TouchableOpacity>
      <Slider
        value={catechismIndex}
        onValueChange={(value) => setCatechismIndex(value)}
        step={1}
        minimumValue={0}
        maximumValue={selectedCatechism.content.length - 1}
        value={catechismIndex}
        style={{
          flexGrow: 1,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (catechismIndex < selectedCatechism.content.length - 1) {
            setCatechismIndex(catechismIndex + 1);
          }
        }}
      >
        <Entypo
          name="chevron-right"
          size={40}
          color={
            catechismIndex === selectedCatechism.content.length - 1
              ? "#bdbdbd"
              : "#489D89"
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
});

export default Navigation;
