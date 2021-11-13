import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import each from "lodash/each";
import isArray from "lodash/isArray";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import Confetti from "react-native-confetti";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import CATECHISMS from "../constants/catechisms";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ScripturesModal from "../components/ScripturesModal";
import ChangeCatechism from "../components/ChangeCatechism";
import Navigation from "../components/Navigation";

let scrollView;
let _confettiView;

function getStrippedText(text) {
  return text.replace(/[^a-zA-Z ]/g, "");
}

function CatechismScreen({
  theme,
  catechism,
  font,
  setCatechism,
  setFont,
  setSize,
  size,
}) {
  const [selectCatechism, setSelectCatechism] = useState(false);
  const [catechismIndex, setCatechismIndex] = useState(0);
  const [answerValue, setAnswerValue] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scriptures, setScriptures] = useState(null);

  useEffect(() => {
    try {
      AsyncStorage.getItem("CATECHISM_INDEX").then((r) =>
        setCatechismIndex(Number(r) || 0)
      );
    } catch (error) {}
    try {
      AsyncStorage.getItem("CATECHISM").then((r) => {
        if (r) {
          setCatechism(r);
        }
      });
    } catch (error) {}
    try {
      AsyncStorage.getItem("FONT").then((r) => {
        if (r && r !== font) {
          setFont(r);
        }
      });
    } catch (error) {}
    try {
      AsyncStorage.getItem("SIZE").then((r) => {
        if (r && Number(r) !== size) {
          setSize(Number(r));
        }
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    setAnswerValue("");
    AsyncStorage.setItem("CATECHISM_INDEX", String(catechismIndex));
  }, [catechismIndex]);

  useEffect(() => {
    _confettiView.stopConfetti();
    setIsAnswered(false);
    setShowAnswer(false);
    setAnswerValue("");

    AsyncStorage.setItem("CATECHISM", catechism);
  }, [catechism]);

  const selectedCatechism = CATECHISMS[Number(catechism)];
  const currentQuestion = selectedCatechism.content[catechismIndex];

  const finalAnswer = currentQuestion.answer
    .map((item) => {
      if (isArray(item)) {
        return item.map((item1) => item1.text).join(" ");
      }

      return item.text;
    })
    .join(" ");
  const answerStripped = getStrippedText(answerValue.replace(/-/g, " "));
  const finalAnswerStripped = getStrippedText(finalAnswer.replace(/-/g, " "));

  let correctLastIndex;
  let isMatch = true;

  let footnote = 0;
  let footnote1 = 0;

  if (!isAnswered) {
    each(answerStripped, (letter, index) => {
      if (
        isMatch &&
        finalAnswerStripped[index] &&
        letter.toLowerCase() === finalAnswerStripped[index].toLowerCase()
      ) {
        correctLastIndex = index;
      } else {
        isMatch = false;
      }
    });

    if (answerStripped.length === finalAnswerStripped.length && isMatch) {
      setIsAnswered(true);
      setShowAnswer(true);
      scrollView.scrollTo({ x: 0, y: 0 });
      _confettiView.startConfetti();
    }
  }

  return (
    <ScrollView
      ref={(node) => (scrollView = node)}
      style={{
        ...styles.container,
        backgroundColor: theme === "Dark" ? "#000" : "#fff",
      }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.selectedCatechism}>
        <Modal
          isVisible={selectCatechism}
          onBackdropPress={() => {
            setSelectCatechism(false);
          }}
        >
          <ChangeCatechism
            theme={theme}
            catechism={catechism}
            font={font}
            setCatechism={setCatechism}
            setCatechismIndex={setCatechismIndex}
            setSelectCatechism={setSelectCatechism}
            size={size}
          />
        </Modal>
        <Confetti
          colors={["#9A51B0", "#B04F66", "#66B04F", "#4FB099"]}
          ref={(node) => (_confettiView = node)}
          untilStopped
        />
        <ScripturesModal
          theme={theme}
          font={font}
          setScriptures={setScriptures}
          size={size}
          scriptures={scriptures}
        />
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectCatechism(true);
            }}
            style={{
              alignItems: "center",
              display: "flex",
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
                Change Catechism
              </AppText>
            </View>
          </TouchableOpacity>
          <Navigation
            catechismIndex={catechismIndex}
            selectedCatechism={selectedCatechism}
            setCatechismIndex={setCatechismIndex}
          />
          <View style={styles.questionSection}>
            <View style={styles.questionText}>
              <AppText font={font} size={size + 10}>
                {catechismIndex + 1}.{" "}
                {isArray(currentQuestion.question)
                  ? currentQuestion.question.map((item, index) => {
                      return (
                        <AppText font={font} key={index}>
                          <AppText font={font} size={size + 10}>
                            {item.text}
                          </AppText>
                          <AppText
                            bold
                            color="#9e9e9e"
                            font={font}
                            size={size + 10}
                          >
                            ({index + 1})
                          </AppText>
                        </AppText>
                      );
                    })
                  : currentQuestion.question}
              </AppText>
              {isArray(currentQuestion.question)
                ? currentQuestion.question.map((item, index) => {
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
                          ({index + 1}) {item.scriptures}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
            {isAnswered ? null : (
              <AppTextInput
                theme={theme}
                font={font}
                placeholder="Enter the answer here"
                setValue={setAnswerValue}
                size={size + 2}
                style={{
                  marginTop: 10,
                  width: "100%",
                }}
                value={answerValue}
              />
            )}
            {answerStripped && !isAnswered ? (
              <View style={styles.answerGreenRed}>
                <AppText font={font}>
                  <AppText
                    bold
                    color={theme === "Dark" ? "lightgreen" : "green"}
                    forceColor
                    font={font}
                  >
                    {answerStripped.slice(0, correctLastIndex + 1)}
                  </AppText>
                  <AppText
                    bold
                    color={theme === "Dark" ? "pink" : "red"}
                    forceColor
                    font={font}
                  >
                    {answerStripped.slice(correctLastIndex + 1)}
                  </AppText>
                </AppText>
              </View>
            ) : null}
            {isAnswered ? null : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={styles.toggleAnswer}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowAnswer(!showAnswer);
                    }}
                  >
                    <AppText color="#489D89" font={font} size={size}>
                      {showAnswer ? "Hide" : "Show"} Answer
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {showAnswer && (
              <View style={styles.answer}>
                <View style={styles.answerHeading}>
                  <AppText bold font={font} size={size}>
                    Answer
                  </AppText>
                </View>
                {isArray(currentQuestion.answer[0]) ? (
                  <View>
                    {currentQuestion.answer.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            marginBottom: 25,
                          }}
                        >
                          <AppText font={font} size={size}>
                            {item.map((item1, index1) => {
                              if (item1.scriptures) {
                                footnote += 1;
                              }

                              return (
                                <AppText font={font} size={size} key={index1}>
                                  {item1.text}
                                  {item1.scriptures && (
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
                ) : (
                  <AppText font={font} size={size}>
                    {currentQuestion.answer.map((item, index) => {
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
                              ({index + 1}){" "}
                            </AppText>
                          )}
                        </AppText>
                      );
                    })}
                  </AppText>
                )}
                <View style={styles.scriptures}>
                  {currentQuestion.answer.map((item, index) => {
                    if (isArray(item)) {
                      return item.map((item1, index1) => {
                        if (item1.scriptures) {
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
                                    scripture: item1.scriptures,
                                  }
                                )
                                .then((response) => {
                                  setScriptures({
                                    text: item1.text,
                                    scriptures: response.data.results,
                                  });
                                })
                                .catch(() => {
                                  setScriptures([]);
                                });
                            }}
                          >
                            <AppText color="#489D89" font={font} size={size}>
                              ({footnote1}) {item1.scriptures}
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
                          ({index + 1}) {item.scriptures}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            {isAnswered ? (
              <View>
                <View
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <MaterialIcons
                    name="check-circle"
                    color="green"
                    size={30}
                    style={{
                      marginRight: 6,
                    }}
                  />
                  <AppText bold color="green" font={font} size={size + 10}>
                    Nice!
                  </AppText>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  {catechismIndex < selectedCatechism.content.length - 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setCatechismIndex(catechismIndex + 1);
                        setIsAnswered(false);
                        setShowAnswer(false);
                        setAnswerValue("");
                        _confettiView.stopConfetti();
                      }}
                      style={{
                        alignItems: "center",
                        backgroundColor: "#489D89",
                        borderColor: "#489D89",
                        borderRadius: 3,
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "row",
                        marginRight: 50,
                        paddingLeft: 10,
                        paddingRight: 2,
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      <AppText
                        color={theme === "Dark" ? "#000" : "#fff"}
                        bold
                        font={font}
                        size={size}
                      >
                        Next Question
                      </AppText>
                      <Entypo
                        color="#fff"
                        name="chevron-right"
                        size={24}
                      ></Entypo>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      setIsAnswered(false);
                      setShowAnswer(false);
                      setAnswerValue("");
                      _confettiView.stopConfetti();
                    }}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <MaterialIcons color="#489D89" name="loop" size={20} />
                    <AppText color="#489D89" font={font} size={size}>
                      Reset
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
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
    width: 150,
  },
  selectedCatechism: {
    paddingBottom: 20,
    width: "100%",
  },
  questionSection: {
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  questionText: {
    marginTop: 20,
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerGreenRed: {
    marginTop: 10,
  },
  toggleAnswer: {
    marginTop: 10,
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
  answerHeading: {
    marginBottom: 10,
  },
  scriptures: {
    marginTop: 10,
  },
  scripturesModal: {
    backgroundColor: "#fff",
    maxHeight: "80%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme,
  catechism: state.catechism,
  font: state.font,
  size: state.size,
});

const mapDispatchToProps = {
  setCatechism(catechism) {
    return {
      type: "SET_CATECHISM",
      payload: {
        catechism,
      },
    };
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(CatechismScreen);
