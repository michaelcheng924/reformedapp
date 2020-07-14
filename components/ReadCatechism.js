import React, { useState } from "react";
import isArray from "lodash/isArray";
import some from "lodash/some";
import axios from "axios";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import AppText from "../components/AppText";
import ScripturesModal from "../components/ScripturesModal";
import ChangeConfession from "../components/ChangeConfession";

let scrollView;

const ReadCatechism = ({
  confession,
  setConfession,
  selectConfession,
  setSelectConfession,
  font,
  size,
  selectedCatechism,
}) => {
  const [scriptures, setScriptures] = useState(null);

  let footnote = 0;
  let footnote1 = 0;

  function renderQuestion(item, index) {
    return (
      <View>
        <AppText bold font={font} size={size + 3}>
          {index + 1}.{" "}
          {isArray(item.question)
            ? item.question.map((item, index) => {
                return (
                  <AppText font={font} key={index}>
                    <AppText bold font={font} size={size + 3}>
                      {item.text}
                    </AppText>
                    <AppText bold color="#9e9e9e" font={font} size={size + 10}>
                      ({index + 1})
                    </AppText>
                  </AppText>
                );
              })
            : item.question}
        </AppText>
        {isArray(item.question)
          ? item.question.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    axios
                      .post("https://mcc-admin.herokuapp.com/scriptures", {
                        scripture: item.scriptures,
                      })
                      .then((response) => {
                        setScriptures({
                          text: item.text,
                          scriptures: response.data.results,
                        });
                      })
                      .catch(() => {
                        setScriptures([]);
                      });
                  }}
                  style={[
                    styles.answer,
                    {
                      marginBottom: 15,
                    },
                  ]}
                >
                  <AppText color="#489D89" font={font} size={size}>
                    ({index + 1}) {item.scriptures}
                  </AppText>
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    );
  }

  function renderAnswer(item, index) {
    if (isArray(item.answer[0])) {
      return (
        <View key={index}>
          {item.answer.map((item1, index1) => {
            return (
              <View
                key={index1}
                style={{
                  marginBottom: 25,
                }}
              >
                <AppText font={font} size={size}>
                  {item1.map((item2, index2) => {
                    if (item2.scriptures) {
                      footnote += 1;
                    }

                    return (
                      <AppText key={index2} font={font} size={size}>
                        {item2.text}
                        {item2.scriptures && (
                          <AppText
                            bold
                            color="#9e9e9e"
                            font={font}
                            size={size}
                            style={styles.scriptureSuperscript}
                          >
                            ({footnote}){" "}
                          </AppText>
                        )}
                      </AppText>
                    );
                  })}
                </AppText>
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <AppText font={font} size={size}>
        {item.answer.map((item, index) => {
          if (item.scriptures) {
            footnote += 1;
          }

          return (
            <AppText font={font} key={index} size={size}>
              {item.text}
              {item.scriptures && (
                <AppText
                  bold
                  color="#9e9e9e"
                  font={font}
                  size={size}
                  style={styles.scriptureSuperscript}
                >
                  ({footnote}){" "}
                </AppText>
              )}
            </AppText>
          );
        })}
      </AppText>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        ref={(node) => (scrollView = node)}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Modal
          isVisible={selectConfession}
          onBackdropPress={() => {
            setSelectConfession(false);
          }}
        >
          <ChangeConfession
            confession={confession}
            font={font}
            setConfession={setConfession}
            setSelectConfession={setSelectConfession}
            size={size}
          />
        </Modal>
        <ScripturesModal
          font={font}
          setScriptures={setScriptures}
          size={size}
          scriptures={scriptures}
        />
        <TouchableOpacity
          onPress={() => {
            setSelectConfession(true);
          }}
          style={{
            alignItems: "center",
            display: "flex",
            marginRight: 45,
            marginBottom: 20,
          }}
        >
          <View style={styles.change}>
            <MaterialIcons
              color="#489D89"
              name="menu"
              size={14}
              style={{
                marginRight: 4,
              }}
            />
            <AppText color="#489D89" font={font} size={14}>
              Change Document
            </AppText>
          </View>
        </TouchableOpacity>
        {selectedCatechism.content.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 35,
              }}
            >
              {renderQuestion(item, index)}
              {renderAnswer(item, index)}
              {some(item.answer, (item1) => {
                if (isArray(item1)) {
                  return some(item1, (item2) => {
                    return item2.scriptures;
                  });
                }

                return item1.scriptures;
              }) ? (
                <View style={[styles.answer, styles.scriptures]}>
                  {item.answer.map((item, index) => {
                    if (isArray(item)) {
                      return item.map((item2, index1) => {
                        if (item2.scriptures) {
                          footnote1 += 1;
                        } else {
                          return null;
                        }

                        return (
                          <TouchableOpacity
                            key={index1}
                            onPress={() => {
                              axios
                                .post(
                                  "https://mcc-admin.herokuapp.com/scriptures",
                                  {
                                    scripture: item2.scriptures,
                                  }
                                )
                                .then((response) => {
                                  setScriptures({
                                    text: item2.text,
                                    scriptures: response.data.results,
                                  });
                                })
                                .catch(() => {
                                  setScriptures([]);
                                });
                            }}
                          >
                            <AppText color="#489D89" font={font} size={size}>
                              ({footnote1}) {item2.scriptures}
                            </AppText>
                          </TouchableOpacity>
                        );
                      });
                    }

                    if (item.scriptures) {
                      footnote1 += 1;
                    } else {
                      return null;
                    }

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          axios
                            .post(
                              "https://mcc-admin.herokuapp.com/scriptures",
                              {
                                scripture: item.scriptures,
                              }
                            )
                            .then((response) => {
                              setScriptures({
                                text: item.text,
                                scriptures: response.data.results,
                              });
                            })
                            .catch(() => {
                              setScriptures([]);
                            });
                        }}
                      >
                        <AppText color="#489D89" font={font} size={size}>
                          ({footnote1}) {item.scriptures}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (scrollView) {
            scrollView.scrollTo({ x: 0, y: 0 });
          }
        }}
      >
        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            backgroundColor: "#fff",
            display: `flex`,
          }}
        >
          <Entypo name="chevron-up" size={30} color="#489D89" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  change: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#489D89",
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  answer: {
    borderWidth: 1,
    borderColor: "#4d5156",
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scriptures: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  font: state.font,
  size: state.size,
});

export default connect(mapStateToProps)(ReadCatechism);
