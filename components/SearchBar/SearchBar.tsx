import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// search icon
import { Feather } from "@expo/vector-icons";

const SearchBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;

  width: ${layout.window.width - 40}px;
`;

const SearchBarInput = styled.TextInput`
  font-size: 14px;
  color: #000;
  text-align: left;
  font-family: NotoSansKR_Bold;
`;

interface SearchBarProps {
  placeholder: string;
  searchBarStyles?: StyleProp<TextStyle>;
}

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  return (
    <SearchBarContainer>
      <SearchBarInput placeholder={props.placeholder} />
      <TouchableOpacity>
        <Feather name="search" size={24} color="#000" />
      </TouchableOpacity>
    </SearchBarContainer>
  );
};

export default SearchBar;
