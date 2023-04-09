import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// colors
// import tintColorLight from '../../constants/Colors';

const StyledText = styled.Text`
  font-size: 37px;
  color: #000;
  text-align: left;
  font-family: Lato-Regular;
`;

// types
import { TextProps } from "./types";

const RegularText: FunctionComponent<TextProps> = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};

export default RegularText;
