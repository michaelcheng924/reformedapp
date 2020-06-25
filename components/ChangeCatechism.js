import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import CATECHISMS from "../constants/catechisms";
import AppText from "../components/AppText";

const ChangeCatechism = ({
  catechism,
  font,
  setCatechism,
  setCatechismIndex,
  setSelectCatechism,
  size,
}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectCatechism(false);
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
          Select Catechism
        </AppText>
        {CATECHISMS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCatechism(String(index));
                setCatechismIndex(0);
                setSelectCatechism(false);
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
                    item.slug === "westminster-shorter" ? (
                      <AppText
                        color={
                          catechism === String(index) ? "#9A51B0" : "green"
                        }
                        font={font}
                        size={size - 3}
                      >
                        Easier
                      </AppText>
                    ) : (
                      <AppText
                        color={catechism === String(index) ? "#9A51B0" : "red"}
                        font={font}
                        size={size - 3}
                      >
                        Harder
                      </AppText>
                    )}
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
  catechismCard: {
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
});

export default ChangeCatechism;
