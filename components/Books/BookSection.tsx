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
  background-color: ${colors.bgGray};
  margin-top: 20px;
  flex: 1;
  padding-left: 20px;
`;
const BookList = styled.FlatList``;

const BookSection: FunctionComponent<BookSectionProps & BookScreenProps> = (
  props
) => {
  return (
    <BookListContainer>
      <BookList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
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
