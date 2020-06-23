import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import CATECHISMS from "../constants/catechisms";
import AppText from "../components/AppText";

const ChangeCatechism = ({
  catechism,
  font,
  setCatechism,
  setSelectCatechism,
  size,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectCatechism(false);
        }}
        style={{
          width: 40,
        }}
      >
        <View style={styles.backButton}>
          <Entypo color="#fff" name="chevron-left" size={35} />
        </View>
      </TouchableOpacity>
      <View style={styles.selectCatechism}>
        <AppText font={font} bold size={20}>
          Select Catechism
        </AppText>
        {CATECHISMS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCatechism(String(index));
              }}
              style={[
                styles.catechismCard,
                {
                  borderColor:
                    catechism === String(index) ? "#9A51B0" : "#4d5156",
                },
              ]}
            >
              <View>
                <AppText
                  color={catechism === String(index) ? "#9A51B0" : "#4d5156"}
                  font={font}
                  size={size}
                >
                  {item.title}
                </AppText>
                <AppText font={font}>
                  <AppText
                    color={catechism === String(index) ? "#9A51B0" : "#4d5156"}
                    font={font}
                    size={size - 3}
                  >
                    Difficulty:
                  </AppText>{" "}
                  <AppText
                    bold
                    color={catechism === String(index) ? "#9A51B0" : "#4d5156"}
                    font={font}
                    size={size - 3}
                  >
                    {item.slug === "boys-girls" ||
                    item.slug === "westminster-shorter"
                      ? "Easier"
                      : "Harder"}
                  </AppText>
                  {" | "}
                  <AppText
                    bold
                    color={catechism === String(index) ? "#9A51B0" : "#4d5156"}
                    font={font}
                    size={size - 3}
                  >
                    {item.content.length}
                  </AppText>{" "}
                  <AppText
                    color={catechism === String(index) ? "#9A51B0" : "#4d5156"}
                    font={font}
                    size={size - 3}
                  >
                    questions
                  </AppText>
                </AppText>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.selectMode}>
          <AppText font={font} bold size={20}>
            Select Mode
          </AppText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#489D89",
    borderRadius: 20,
    display: "flex",
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    paddingTop: 2,
    width: 40,
  },
  container: {
    flex: 1,
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
  selectMode: {
    marginTop: 20,
  },
  catechismCard: {
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
});

export default ChangeCatechism;
