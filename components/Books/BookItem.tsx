import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, Image, View, Alert } from "react-native";
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

// apis
import { getWishlistById, getIsWishlist } from "../../apis/wishlist";

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
    props.isLoanAvailable === "Y" ? colors.lightgreen : colors.red};
  border-radius: 8px;
`;

const BookItem: FunctionComponent<BookProps & BookScreenProps> = (props) => {
  const route = useRoute<SerachBookDetailScreenProps["route"]>();
  const navigation = useNavigation<SerachBookDetailScreenProps["navigation"]>();

  const { user, logoutUser } = useContext(UserContext);
  const [isWishlist, setIsWishlist] = useState(
    props.isDetail === true ? route.params.isWishlist : props.isWishlist
  );

  // const [newIsWishlist, setNewIsWishlist] = useState(false);
  // const [newIsWishlistLoaded, setNewIsWishlistLoaded] = useState(false);

  useEffect(() => {
    // setIsWishlist(props.isWishlist);
  }, [isWishlist]);

  return (
    <BookContainer
      onPress={() => {
        navigation.navigate("SearchBookDetail", {
          bookIsbn: props.isbn13,
          libCode: props.libCode,
          isFromBookResult: props.isFromBookResult,
          addWishlist: props.addWishlist,
          deleteWishlist: props.deleteWishlist,
          updateWishlist: props.updateWishlist,
          isWishlist: props.isWishlist,
        });
      }}
      isSearchResult={props.isSearchResult}
      disabled={props.isDetail}
    >
      {/* <BookImage source={{ uri: props.bookImageURL }} /> */}
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
              props.bookImageURL ||
              "http://image.aladin.co.kr/product/4086/97/cover/8936434128_2.jpg",
          }}
        />
      </View>

      <BookRating
        isSearchResult={props.isSearchResult}
        isDetail={props.isDetail}
        onPress={() => {
          navigation.navigate("Rating", {
            bookIsbn: props.isbn13,
            bookName: props.bookname,
          });
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 12 }}>
          ★ {props.bookRating}
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
          <BookTitle>{props.bookname}</BookTitle>
          <BookAuthor>
            {props.isSearchResult
              ? `저자: ${props.authors}\n 출판사: ${props.publisher}`
              : `- ${props.authors}`}
          </BookAuthor>
        </View>
      ) : (
        <>
          <BookTitle>{props.bookname}</BookTitle>
          <BookAuthor>
            {props.isSearchResult
              ? `저자: ${props.authors}\n 출판사: ${props.publisher}`
              : `- ${props.authors}`}
          </BookAuthor>
        </>
      )}
      {props.isSearchResult ? (
        <>
          <AddToWishlistButton
            isWishlist={props.isWishlist}
            onPress={
              props.isWishlist
                ? () => {
                    Alert.alert("주의", "정말로 찜 취소를 하시겠습니까?", [
                      {
                        text: "취소",
                        onPress: () => {
                          return;
                        },
                      },
                      {
                        text: "확인",
                        onPress: () => {
                          props.deleteWishlist(user.user_id, props.isbn13);
                          // setIsWishlist(false);
                          // navigation.navigate("MyLibrary");
                          props.updateWishlist();
                        },
                      },
                    ]);
                  }
                : () => {
                    Alert.alert("알림", "이 책을 찜하시겠습니까?", [
                      {
                        text: "취소",
                        onPress: () => {
                          return;
                        },
                      },
                      {
                        text: "확인",
                        onPress: () => {
                          props.addWishlist(user.user_id, props.isbn13);
                          // setIsWishlist(false);
                          // navigation.navigate("MyLibrary");
                          props.updateWishlist();
                        },
                      },
                    ]);
                  }
            }
          >
            <Text
              style={{
                color: props.isWishlist ? colors.semiblack : colors.white,
                fontSize: 12,
              }}
            >
              {props.isWishlist ? "찜완료" : "찜하기"}
            </Text>
          </AddToWishlistButton>
          {props.isFromBookResult ? null : (
            <LoanStatusButton isLoanAvailable={props.isLoanAvailable}>
              <Text
                style={{
                  color: isWishlist ? colors.semiblack : colors.white,
                  fontSize: 12,
                }}
              >
                {props.isLoanAvailable === "Y" ? "대출 가능" : "대출중"}
              </Text>
            </LoanStatusButton>
          )}
        </>
      ) : null}
    </BookContainer>
  );
};

export default BookItem;
