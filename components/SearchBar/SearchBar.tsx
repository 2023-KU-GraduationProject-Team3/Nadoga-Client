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
interface SearchBarProps {
  placeholder: string;
  searchBarStyles?: StyleProp<TextStyle>;
}

// components
const SearchBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: ${layout.window.width - 40}px;
  background-color: ${colors.white};
`;

const SearchBarInput = styled.TextInput`
  font-size: 14px;
  color: #000;
  text-align: left;
  font-family: NotoSansKR_Bold;
  width: 80%;
  flex-direction: row;
`;

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  // navigation hooks
  const route = useRoute<SearchBookResultScreenProps["route"]>();
  const navigation = useNavigation<SearchBookResultScreenProps["navigation"]>();

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchBarContainer>
      <SearchBarInput
        placeholder={props.placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchBookResult", {
            bookName: searchValue,
          });
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
