import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import {
  StyleProp,
  TextStyle,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// components
const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${layout.window.width - 60}px;
  margin-top: 20px;
`;

// types
interface HeaderProps {
  title: string;
  description: string;
  menuNum?: number;
  handleMenuNum?: (num: number) => void;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

const MyLibraryHeader: FunctionComponent<HeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <View
        style={{
          width: "100%",
          height: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={props.titleTextStyle}>{props.title}</Text>
      </View>
      <Text style={props.descriptionTextStyle}>{props.description}</Text>
    </HeaderContainer>
  );
};

export default MyLibraryHeader;
