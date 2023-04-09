import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// icons
import { Feather } from "@expo/vector-icons";

// types
import { SearchBookResultScreenProps } from "../../types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
interface SearchBarProps {
  placeholder: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  searchBarStyles?: StyleProp<ViewProps>;
  searchBarTextStyles?: StyleProp<TextStyle>;
}

// components
const SearchBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: ${layout.window.width - 40}px;
  height: 50px;
  background-color: ${colors.white};
`;

const SearchBarInput = styled.TextInput`
  color: #000;
  font-size: 14px;
  text-align: left;
  width: 80%;
  line-height: 14px;
  flex-direction: row;
`;

const SearchBar: FunctionComponent<SearchBarProps> = ({
  placeholder,
  searchValue,
  searchBarStyles,
  setSearchValue,
  handleSearch,
}) => {
  // navigation hooks
  const route = useRoute<SearchBookResultScreenProps["route"]>();
  const navigation = useNavigation<SearchBookResultScreenProps["navigation"]>();

  return (
    <SearchBarContainer style={{ ...searchBarStyles }}>
      <SearchBarInput
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          handleSearch();
          setSearchValue("");
        }}
        disabled={searchValue.length === 0}
      >
        <Feather name="search" size={24} color="#000" />
      </TouchableOpacity>
    </SearchBarContainer>
  );
};

export default SearchBar;
