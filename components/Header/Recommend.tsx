import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, View } from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// components
const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${layout.window.width - 40}px;
  margin-top: 20px;
`;

// types
interface HeaderProps {
  title: string;
  description: string;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

const RecommendHeader: FunctionComponent<HeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <View
        style={{
          width: "100%",
          backgroundColor: "lightgray",
        }}
      >
        <Text style={props.titleTextStyle}>{props.title}</Text>
      </View>
      <Text style={props.descriptionTextStyle}>{props.description}</Text>
    </HeaderContainer>
  );
};

export default RecommendHeader;
