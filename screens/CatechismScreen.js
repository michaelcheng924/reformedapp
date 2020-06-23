import React, { useState } from "react";
import { connect } from "react-redux";
import each from "lodash/each";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

import CATECHISMS from "../constants/catechisms";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ScripturesModal from "../components/ScripturesModal";
import ChangeCatechism from "../components/ChangeCatechism";
import Navigation from "../components/Navigation";

function getStrippedText(text) {
  return text.replace(/[^a-zA-Z ]/g, "");
}

function CatechismScreen({ catechism, font, setCatechism, size }) {
  const [selectCatechism, setSelectCatechism] = useState(false);
  const [catechismIndex, setCatechismIndex] = useState(0);
  const [answerValue, setAnswerValue] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scriptures, setScriptures] = useState(null);

  const selectedCatechism = CATECHISMS[Number(catechism)];
  const currentQuestion = selectedCatechism.content[catechismIndex];

  const finalAnswer = currentQuestion.answer.map((item) => item.text).join(" ");
  const answerStripped = getStrippedText(answerValue);
  const finalAnswerStripped = getStrippedText(finalAnswer);

  let correctLastIndex;
  let isMatch = true;

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
    }
  }

  const content = selectCatechism ? (
    <ChangeCatechism
      catechism={catechism}
      font={font}
      setCatechism={setCatechism}
      setSelectCatechism={setSelectCatechism}
      size={size}
    />
  ) : (
    <View style={styles.selectedCatechism}>
      <ScripturesModal
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
            <AppText color="#489D89" font={font} size={14}>
              Change Catechism / Mode
            </AppText>
          </View>
        </TouchableOpacity>
        <Navigation
          catechismIndex={catechismIndex}
          selectedCatechism={selectedCatechism}
          setCatechismIndex={setCatechismIndex}
        />
      </View>
      <View style={styles.questionSection}>
        <View style={styles.questionText}>
          <AppText font={font} size={size + 10}>
            {catechismIndex + 1}. {currentQuestion.question}
          </AppText>
        </View>
        {isAnswered ? null : (
          <AppTextInput
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
              <AppText bold color="green" font={font}>
                {answerStripped.slice(0, correctLastIndex + 1)}
              </AppText>
              <AppText bold color="red" font={font}>
                {answerStripped.slice(correctLastIndex + 1)}
              </AppText>
            </AppText>
          </View>
        ) : null}
        {isAnswered ? null : (
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
        )}
        {showAnswer && (
          <View style={styles.answer}>
            <View style={styles.answerHeading}>
              <AppText bold font={font} size={size}>
                Answer
              </AppText>
            </View>
            <AppText font={font} size={size}>
              {currentQuestion.answer.map((item, index) => {
                return (
                  <AppText font={font} key={index} size={size}>
                    {item.text}
                    {item.scriptures && (
                      <AppText
                        bold
                        font={font}
                        size={size}
                        style={styles.scriptureSuperscript}
                      >
                        ({index + 1})
                      </AppText>
                    )}
                  </AppText>
                );
              })}
            </AppText>
            <View style={styles.scriptures}>
              {currentQuestion.answer.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      axios
                        .post("https://mcc-admin.herokuapp.com/scriptures", {
                          scripture: item.scriptures,
                        })
                        .then((response) => {
                          setScriptures(response.data.results);
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
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  selectedCatechism: {
    flex: 1,
    alignItems: "center",
  },
  change: {
    borderWidth: 1,
    borderColor: "#489D89",
    borderTopWidth: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    width: 182,
  },
  questionSection: {
    flex: 1,
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
    width: 105,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CatechismScreen);
