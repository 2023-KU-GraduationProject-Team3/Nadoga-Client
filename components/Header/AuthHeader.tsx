import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  StyleProp,
  TextStyle,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
interface HeaderProps {
  englishTitle: string;
  koreanTitle: string;
}

export default function AuthHeader({ englishTitle, koreanTitle }: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>{englishTitle}</Text>
      <Text style={styles.koreanTitle}>{koreanTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "NotoSansKR-Medium",
    color: colors.semiblack,
    fontWeight: "bold",
  },
  koreanTitle: {
    fontSize: 36,
    fontFamily: "NotoSansKR-Black",
    color: colors.semiblack,
    fontWeight: "bold",
  },
});
