import React, { useState } from "react";
import isArray from "lodash/isArray";
import some from "lodash/some";
import axios from "axios";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import AppText from "./AppText";
import ScripturesModal from "./ScripturesModal";
import ChangeConfession from "./ChangeConfession";

let scrollView;

const ReadCreed = ({
  confession,
  setConfession,
  selectConfession,
  setSelectConfession,
  font,
  size,
  selectedCreed,
}) => {
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
              Change Document
            </AppText>
          </View>
        </TouchableOpacity>
        {selectedCreed.content.map((paragraph, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 25,
                marginTop: 20,
              }}
            >
              {paragraph.paragraph.map((item, index1) => {
                return (
                  <View
                    key={index1}
                    style={{
                      marginLeft:
                        item.styles && item.styles.indexOf("indent") !== -1
                          ? 25
                          : 0,
                    }}
                  >
                    <AppText font={font} size={size}>
                      {item.text}
                    </AppText>
                  </View>
                );
              })}
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
});

const mapStateToProps = (state) => ({
  font: state.font,
  size: state.size,
});

export default connect(mapStateToProps)(ReadCreed);
