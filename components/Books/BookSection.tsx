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
  flex: 1;
  padding-left: 15px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const BookList = styled.FlatList``;

const BookSection: FunctionComponent<BookSectionProps & BookScreenProps> = (
  props
) => {
  useEffect(() => {
    // order by createdAt
    // console.log("BookSection props", props.books);
    // console.log("Booksection wishlist", props.wishlist);
  }, []);

  const sortedBooks = () => {
    return props?.books.sort((a: any, b: any) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // const checkIsWishlist = (isbn13: number) => {
  //   console.log("checkIsWishlist", props?.wishlist);

  //   return props?.wishlist.some((item: any) => Number(item.isbn) === isbn13);
  // };

  return (
    <BookListContainer>
      <BookList
        contentContainerStyle={{
          backgroundColor: colors.bgGray,
        }}
        data={props.isFromBookResult ? props.books : sortedBooks()}
        numColumns={props.isSearchResult ? 1 : 3}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ isbn13 }: any) => isbn13}
        renderItem={({ item }: any) => (
          <BookItem
            key={item.isbn13}
            libCode={props.libCode}
            isFromBookResult={props.isFromBookResult}
            isSearchResult={props.isSearchResult}
            onPressWishlist={props.onPressWishlist}
            addWishlist={props.addWishlist}
            deleteWishlist={props.deleteWishlist}
            updateWishlist={props.updateWishlist}
            // isWishlist={item.isWishlist}
            isWishlist={item.isWishlist}
            addSearch={props.addSearch}
            {...item}
          />
        )}
      />
    </BookListContainer>
  );
};

export default BookSection;
