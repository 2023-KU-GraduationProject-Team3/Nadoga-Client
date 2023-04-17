import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, Image, View } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

// useContext
import UserContext from "../../context/userContext";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
import { BookProps, BookScreenProps } from "./types";
import { SerachBookDetailScreenProps } from "../../types";

// react-query
import { useQueries, useQuery } from "react-query";

// axios
import axios from "axios";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// components
const BookContainer = styled.TouchableOpacity`
  flex-direction: ${(props) => (props.isSearchResult ? "row" : "column")};
  align-items: flex-start;
	background-color: ${colors.bgGray}
  position: relative;
	width: ${(props) => (props.isSearchResult ? layout.window.width - 40 : 115)}px;
	height: 200px;
  margin-right: ${(props) => (props.isSearchResult ? 20 : 0)}px;
  margin-bottom: ${(props) => (props.isSearchResult ? 30 : 70)}px;
  padding: 5px;
`;

const BookImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const BookRating = styled.TouchableOpacity`
  position: absolute;
  right: ${(props) =>
    props.isSearchResult ? (props.isDetail ? 150 : 140) : 10}px;

  bottom: ${(props) => (props.isSearchResult ? 0 : 40)}px;
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
  margin-top: 5px;
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
  bottom: 0px;
  background-color: ${(props) =>
    props.isWishlist ? colors.gray3 : colors.green};
  border-radius: 8px;
`;

const LoanStatusButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 67px;
  height: 27px;
  right: 0px;
  bottom: 35px;
  background-color: ${(props) =>
    props.is_loanAvailable === "Y" ? colors.lightgreen : colors.red};
  border-radius: 8px;
`;

const BookItem: FunctionComponent<BookProps & BookScreenProps> = (props) => {
  const route = useRoute<SerachBookDetailScreenProps["route"]>();
  const navigation = useNavigation<SerachBookDetailScreenProps["navigation"]>();

  const { user, logoutUser } = useContext(UserContext);

  useEffect(() => {
    // console.log("BookItem props", props);
  }, [props]);

  return (
    <BookContainer
      onPress={() => {
        navigation.navigate("SearchBookDetail", {
          bookIsbn: props.book_isbn,
          libCode: props.libCode,
          isFromBookResult: props.isFromBookResult,
          bookInfo: props,
        });
      }}
      isSearchResult={props.isSearchResult}
      disabled={props.isDetail}
    >
      {/* <BookImage source={{ uri: props.book_image_url }} /> */}
      <View
        style={{
          width: props.isSearchResult ? 120 : 90,
          height: props.isSearchResult ? 200 : 150,
          marginRight: props.isSearchResult ? 10 : 0,
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
        onPress={() => {
          navigation.navigate("Rating", {
            bookIsbn: props.book_isbn,
            bookName: props.book_name,
          });
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 12 }}>
          ★ {props.book_rating}
        </Text>
      </BookRating>
      {props.isSearchResult ? (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: colors.bgGray,
            width: "65%",
            height: 100,
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
        <>
          <AddToWishlistButton
            isWishlist={props.is_wishlist}
            onPress={() => {
              props.is_wishlist
                ? props.deleteWishlist(user.user_id, props.book_isbn)
                : props.addWishlist(user.user_id, props.book_isbn);
            }}
          >
            <Text
              style={{
                color: props.is_wishlist ? colors.semiblack : colors.white,
                fontSize: 12,
              }}
            >
              {props.is_wishlist ? "찜완료" : "찜하기"}
            </Text>
          </AddToWishlistButton>
          {props.isFromBookResult ? null : (
            <LoanStatusButton is_loanAvailable={props.is_loanAvailable}>
              <Text
                style={{
                  color: props.is_wishlist ? colors.semiblack : colors.white,
                  fontSize: 12,
                }}
              >
                {props.is_loanAvailable === "Y" ? "대출 가능" : "대출중"}
              </Text>
            </LoanStatusButton>
          )}
        </>
      ) : null}
    </BookContainer>
  );
};

export default BookItem;
