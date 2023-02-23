import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, SafeAreaView } from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
import { BookSectionProps, BookScreenProps } from "./types";

// components
import BookItem from "./BookItem";

const BookListContainer = styled.View`
  width: ${layout.window.width}px;
  flex: 1;
  background-color: ${colors.bgGray};
  align-items: center;
  margin-top: 20px;
`;
const BookList = styled.FlatList``;

const BookSection: FunctionComponent<BookSectionProps & BookScreenProps> = (
  props
) => {
  return (
    <BookListContainer>
      <BookList
        data={props.books}
        numColumns={props.isSearchResult ? 1 : 3}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ book_isbn }: any) => book_isbn.toString()}
        renderItem={({ item }: any) => (
          <BookItem
            isSearchResult={props.isSearchResult}
            onPressWishlist={props.onPressWishlist}
            {...item}
          />
        )}
      />
    </BookListContainer>
  );
};

export default BookSection;
