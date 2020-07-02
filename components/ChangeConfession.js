import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import CONFESSIONS from "../constants/confessions";
import CATECHISMS from "../constants/catechisms";
import CREEDS from "../constants/creeds";
import AppText from "./AppText";

const ChangeConfession = ({
  confession,
  font,
  setConfession,
  setChapterIndex = () => {},
  setSelectConfession,
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
          Confessions
        </AppText>
        {CONFESSIONS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setConfession(String(index));
                setChapterIndex(0);
                setSelectConfession(false);
              }}
              style={[
                styles.catechismCard,
                {
                  borderColor:
                    confession === String(index) ? "#9A51B0" : "#4d5156",
                },
              ]}
            >
              <View>
                <AppText
                  color={confession === String(index) ? "#9A51B0" : "#4d5156"}
                  font={font}
                  size={size}
                >
                  {item.title}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.selectCatechism}>
        <AppText font={font} bold size={20}>
          Catechisms
        </AppText>
        {CATECHISMS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setConfession(`CATECHISM_${String(index)}`);
                setChapterIndex(0);
                setSelectConfession(false);
              }}
              style={[
                styles.catechismCard,
                {
                  borderColor:
                    confession === `CATECHISM_${String(index)}`
                      ? "#9A51B0"
                      : "#4d5156",
                },
              ]}
            >
              <View>
                <AppText
                  color={
                    confession === `CATECHISM_${String(index)}`
                      ? "#9A51B0"
                      : "#4d5156"
                  }
                  font={font}
                  size={size}
                >
                  {item.title}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.selectCatechism}>
        <AppText font={font} bold size={20}>
          Creeds
        </AppText>
        {CREEDS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setConfession(`CREED_${String(index)}`);
                setChapterIndex(0);
                setSelectConfession(false);
              }}
              style={[
                styles.catechismCard,
                {
                  borderColor:
                    confession === `CREED_${String(index)}`
                      ? "#9A51B0"
                      : "#4d5156",
                },
              ]}
            >
              <View>
                <AppText
                  color={
                    confession === `CREED_${String(index)}`
                      ? "#9A51B0"
                      : "#4d5156"
                  }
                  font={font}
                  size={size}
                >
                  {item.title}
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
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
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

export default ChangeConfession;
