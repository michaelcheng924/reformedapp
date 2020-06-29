import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Slider, StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { Entypo, MaterialIcons, Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import CONFESSIONS from "../constants/confessions";
import AppText from "../components/AppText";
import ChangeConfession from "../components/ChangeConfession";
import ChangeChapter from "../components/ChangeChapter";
import ScripturesModal from "../components/ScripturesModal";

let scrollView;

function ConfessionsScreen({
  confession,
  font,
  setConfession,
  setFont,
  setSize,
  size,
}) {
  const [selectConfession, setSelectConfession] = useState(false);
  const [selectChapter, setSelectChapter] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [scriptures, setScriptures] = useState(null);

  useEffect(() => {
    try {
      AsyncStorage.getItem("CONFESSION_INDEX").then((r) =>
        setChapterIndex(Number(r) || 0)
      );
    } catch (error) {}
    try {
      AsyncStorage.getItem("CONFESSION").then((r) => {
        if (r) {
          setConfession(r);
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
    scrollView.scrollTo({ x: 0, y: 0 });
  }, [confession, chapterIndex]);

  useEffect(() => {
    AsyncStorage.setItem("CONFESSION_INDEX", String(chapterIndex));
  }, [chapterIndex]);

  useEffect(() => {
    AsyncStorage.setItem("CONFESSION", confession);
  }, [confession]);

  const selectedConfession = CONFESSIONS[Number(confession)];
  const selectedChapter = selectedConfession.content[chapterIndex];

  const previousChapter = selectedConfession.content[chapterIndex - 1];
  const nextChapter = selectedConfession.content[chapterIndex + 1];

  let footnote = 0;
  let footnote1 = 0;

  function renderNavigation() {
    return (
      <View
        style={{
          display: "flex",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {previousChapter ? (
          <TouchableOpacity
            onPress={() => {
              setChapterIndex(chapterIndex - 1);
            }}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Entypo name="chevron-left" size={30} color={"#489D89"} />
            <AppText color="#489D89" font={font} size={size + 3}>
              {previousChapter.chapter}. {previousChapter.title}
            </AppText>
          </TouchableOpacity>
        ) : null}
        <Slider
          value={chapterIndex}
          onValueChange={(value) => setChapterIndex(value)}
          step={1}
          minimumValue={0}
          maximumValue={selectedConfession.content.length - 1}
          value={chapterIndex}
          style={{
            flexGrow: 1,
          }}
        />
        {nextChapter ? (
          <TouchableOpacity
            onPress={() => {
              setChapterIndex(chapterIndex + 1);
            }}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginLeft: "auto",
            }}
          >
            <AppText color="#489D89" font={font} size={size + 2}>
              {nextChapter.chapter}. {nextChapter.title}
            </AppText>
            <Entypo
              name="chevron-right"
              size={30}
              color={"#489D89"}
              style={{
                position: `relative`,
                top: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  function renderText() {
    if (typeof selectedChapter.content[0] === "string") {
      return selectedChapter.content.map((paragraph, index) => {
        return (
          <View
            key={index}
            style={{
              marginBottom: 25,
            }}
          >
            <AppText font={font} size={size}>
              {paragraph}
            </AppText>
          </View>
        );
      });
    }

    return (
      <View>
        {selectedChapter.content.map((paragraph, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 25,
              }}
            >
              <AppText font={font} size={size}>
                <AppText bold font={font} size={size}>
                  {index + 1}.{" "}
                </AppText>
                {paragraph.map((section, index1) => {
                  if (section.scriptures) {
                    footnote += 1;
                  }

                  return (
                    <AppText font={font} size={size} key={index1}>
                      {section.text}
                      {section.scriptures ? (
                        <AppText color="#9e9e9e" bold font={font} size={size}>
                          ({footnote}){" "}
                        </AppText>
                      ) : null}
                    </AppText>
                  );
                })}
              </AppText>

              <View
                style={{
                  borderColor: "#4d5156",
                  borderWidth: 1,
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {paragraph.map((section, index1) => {
                  if (section.scriptures) {
                    footnote1 += 1;
                  } else {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      key={index1}
                      onPress={() => {
                        axios
                          .post("https://mcc-admin.herokuapp.com/scriptures", {
                            scripture: section.scriptures,
                          })
                          .then((response) => {
                            setScriptures({
                              text: section.text,
                              scriptures: response.data.results,
                            });
                          })
                          .catch(() => {
                            setScriptures([]);
                          });
                      }}
                    >
                      <AppText font={font}>
                        <AppText bold color="#489D89" font={font} size={size}>
                          ({footnote1})
                        </AppText>{" "}
                        <AppText color="#489D89" font={font} size={size}>
                          {section.scriptures}
                        </AppText>
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView ref={(node) => (scrollView = node)} style={styles.container}>
      <View>
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
            setChapterIndex={setChapterIndex}
            setSelectConfession={setSelectConfession}
            size={size}
          />
        </Modal>
        <Modal
          isVisible={selectChapter}
          onBackdropPress={() => {
            setSelectChapter(false);
          }}
        >
          <ChangeChapter
            chapterIndex={chapterIndex}
            selectedConfession={selectedConfession}
            font={font}
            setConfession={setConfession}
            setChapterIndex={setChapterIndex}
            setSelectChapter={setSelectChapter}
            size={size}
          />
        </Modal>
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
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectConfession(true);
            }}
            style={{
              alignItems: "center",
              display: "flex",
              marginRight: 45,
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
                Change Confession
              </AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectChapter(true);
            }}
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <View style={styles.change}>
              <Octicons
                color="#489D89"
                name="list-ordered"
                size={14}
                style={{
                  marginRight: 4,
                }}
              />
              <AppText color="#489D89" font={font} size={14}>
                Chapter List
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {renderNavigation()}
          <AppText bold font={font} size={size + 5}>
            {selectedChapter.chapter === "Preface" ? "" : `Chapter `}
            {selectedChapter.chapter}. {selectedChapter.title}
          </AppText>
          {renderText()}
          {renderNavigation()}
        </View>
      </View>
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
});

const mapStateToProps = (state) => ({
  confession: state.confession,
  font: state.font,
  size: state.size,
});

const mapDispatchToProps = {
  setConfession(confession) {
    return {
      type: "SET_CONFESSION",
      payload: {
        confession,
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfessionsScreen);
