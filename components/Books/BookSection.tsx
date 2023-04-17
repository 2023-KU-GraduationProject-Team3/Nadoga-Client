import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, SafeAreaView, View } from "react-native";

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
  padding-top: 20px;
  flex: 1;
  padding-left: 15px;
`;
const BookList = styled.FlatList``;

const BookSection: FunctionComponent<BookSectionProps & BookScreenProps> = (
  props
) => {
  useEffect(() => {
    // order by createdAt
  }, [props.books]);

  const sortedBooks = () => {
    return props.books.sort((a: any, b: any) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  return (
    <BookListContainer>
      {props.books.length === 0 ? (
        <View>
          <Text>불러오는 중...</Text>
        </View>
      ) : (
        <BookList
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bgGray,
          }}
          data={sortedBooks()}
          numColumns={props.isSearchResult ? 1 : 3}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ book_isbn }: any) => book_isbn}
          renderItem={({ item }: any) => (
            <BookItem
              key={item.book_isbn}
              libCode={props.libCode}
              isFromBookResult={props.isFromBookResult}
              isSearchResult={props.isSearchResult}
              onPressWishlist={props.onPressWishlist}
              {...item}
            />
          )}
        />
      )}
    </BookListContainer>
  );
};

export default BookSection;
