import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, SafeAreaView } from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
import { BookSectionProps } from "./types";

// components
import BookItem from "./BookItem";

const BookListContainer = styled.View`
  width: ${layout.window.width}px;
  flex: 1;
  background-color: ${colors.bgGray};
  align-items: center;
`;
const BookList = styled.FlatList``;

const BookSection: FunctionComponent<BookSectionProps> = (props) => {
  return (
    <BookListContainer>
      <BookList
        data={props.books}
        numColumns={3}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ book_isbn }: any) => book_isbn.toString()}
        renderItem={({ item }: any) => <BookItem {...item} />}
      />
    </BookListContainer>
  );
};

export default BookSection;
