import React, { FunctionComponent, useState } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, Image, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
import { BookProps, BookScreenProps } from "./types";
import { SerachBookDetailScreenProps } from "../../types";

// components
const BookContainer = styled.TouchableOpacity`
  flex-direction: ${(props) => (props.isSearchResult ? "row" : "column")};
  align-items: flex-start;
	background-color: ${colors.bgGray}
  position: relative;
	width: ${(props) => (props.isSearchResult ? layout.window.width - 40 : 115)}px;
	height: 200px;
  margin-right: ${(props) => (props.isSearchResult ? 20 : 0)}px;
  margin-bottom: ${(props) => (props.isSearchResult ? 0 : 50)}px;
`;

const BookImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const BookRating = styled.View`
  position: absolute;
  right: ${(props) =>
    props.isSearchResult ? (props.isDetail ? 200 : 10) : 20}px;
  top: ${(props) =>
    props.isSearchResult ? (props.isDetail ? 100 : 0) : 130}px;
  background-color: ${colors.lightgreen};
  width: 40px;
  height: 23px;
  border-radius: 13px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BookTitle = styled.Text`
  font-size: 14px;
  font-family: Poppins_Medium;
  color: ${colors.black};
`;

const BookAuthor = styled.Text`
  font-size: 12px;
  font-family: Poppins_Medium;
  color: ${colors.gray4};
`;

const AddToWishlistButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 67px;
  height: 27px;
  right: 0px;
  bottom: 50px;
  background-color: ${(props) =>
    props.isWishlist ? colors.gray3 : colors.green};
  border-radius: 8px;
`;

const BookItem: FunctionComponent<BookProps & BookScreenProps> = (props) => {
  const route = useRoute<SerachBookDetailScreenProps["route"]>();
  const navigation = useNavigation<SerachBookDetailScreenProps["navigation"]>();

  return (
    <BookContainer
      onPress={() => {
        navigation.navigate("SearchBookDetail", {
          bookIsbn: props.book_isbn,
        });
      }}
      isSearchResult={props.isSearchResult}
      disabled={props.isDetail}
    >
      {/* <BookImage source={{ uri: props.book_image_url }} /> */}
      <View
        style={{
          width: 90,
          height: 150,
        }}
      >
        <BookImage
          source={{
            uri:
              props.book_image_url ||
              "http://image.aladin.co.kr/product/4086/97/cover/8936434128_2.jpg",
          }}
        />
      </View>

      <BookRating
        isSearchResult={props.isSearchResult}
        isDetail={props.isDetail}
      >
        <Text style={{ fontWeight: "700", fontSize: 12 }}>
          ★{props.book_rating}
        </Text>
      </BookRating>
      {props.isSearchResult ? (
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <BookTitle>{props.book_name}</BookTitle>
          <BookAuthor>
            {props.isSearchResult
              ? `저자: ${props.book_author}\n 출판사: ${props.book_publisher}`
              : `- ${props.book_author}`}
          </BookAuthor>
        </View>
      ) : (
        <>
          <BookTitle>{props.book_name}</BookTitle>
          <BookAuthor>
            {props.isSearchResult
              ? `저자: ${props.book_author}\n 출판사: ${props.book_publisher}`
              : `- ${props.book_author}`}
          </BookAuthor>
        </>
      )}
      {props.isSearchResult ? (
        <AddToWishlistButton
          isWishlist={props.is_wishlist}
          onPress={() => {
            props.onPressWishlist(props.book_isbn);
          }}
        >
          <Text
            style={{
              color: props.is_wishlist ? colors.semiblack : colors.white,
              fontSize: 12,
              fontFamily: "NotoSansKR_Medium",
            }}
          >
            {props.is_wishlist ? "찜완료" : "찜하기"}
          </Text>
        </AddToWishlistButton>
      ) : null}
    </BookContainer>
  );
};

export default BookItem;
