import styled from "styled-components/native";
import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

// types
import { SerachBookDetailScreenProps } from "../types";
import { BookProps } from "../components/Books/types";

// constants
import layout from "../constants/Layout";

// icons
import { Feather } from "@expo/vector-icons";

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";
import React from "react";

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 170px;
  height: 50px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin: 10px 220px 10px 0;
  padding-left: 30px;
`;

const SearchLibraryContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: ${layout.window.width - 50}px;
  height: 30px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin-bottom: 30px;
`;

const BookDescrptionContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: ${layout.window.width - 50}px;
  height: 400px;
  background-color: ${colors.bgGray};
`;

// useContext
import UserContext from "../context/userContext";
import BookContext from "../context/bookContext";

// apis
import { getWithURI } from "../apis/data4library";

export default function SearchBookDetail({
  route,
  navigation,
}: SerachBookDetailScreenProps) {
  const {
    user,
    logoutUser,
    setIsLookingForBook,
    lookingBookInfo,
    setLookingBookInfo,
    closestLibraryList,
    setClosestLibraryList,
    isLoanList,
    setIsLoanList,
  } = useContext(UserContext);

  const [bookInfo, setBookInfo] = useState(route.params.bookInfo);

  // data : books
  const navigationState = useNavigationState((state) => state);
  const [foundBook, setFoundBook] = useState<BookProps>();
  const bookIsbn = route.params.bookIsbn;
  const [libCode, setLibCode] = useState(route.params.libCode);

  const [isFromBookResult, setIsFromBookResult] = useState(
    route.params.isFromBookResult
  );

  // API function - 6. 도서 상세 조회
  const getBookDetail = async () => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  // react-query - GET_BOOK_DETAIL
  const { data, isLoading, error } = useQuery(
    "GET_BOOK_DETAIL",
    getBookDetail,
    {
      refetchOnWindowFocus: true,
      onSuccess: async (data) => {
        // console.log(data);

        const book = data.response.detail[0].book;
        console.log("bookInfo", book);

        setFoundBook({
          book_isbn: book.isbn13,
          book_name: book.bookname,
          book_author: book.authors,
          book_publisher: book.publisher,
          book_description: book.description,
          book_image_url: book.bookImageURL,
          book_rating: 4.5,
          is_wishlist: false,
        });

        setLookingBookInfo({
          book_isbn: book.isbn13,
          book_name: book.bookname,
          book_author: book.authors,
          book_publisher: book.publisher,
          book_description: book.description,
          book_image_url: book.bookImageURL,
          book_rating: 4.5,
          is_wishlist: false,
        });
        let updatedLoanList = [];
        closestLibraryList.map(async (library) => {
          const data = await getBookStatus(library.libCode, book.isbn13);
          console.log("libCode", libCode);
          console.log("library.libCode", library.libCode);

          const libData = {
            libCode: library.libCode,
            loanAvailable: data.response.result.loanAvailable,
          };

          updatedLoanList.push(libData);
        });
        setIsLoanList(updatedLoanList);
      },
    }
  );

  useEffect(() => {
    // alert(bookIsbn);
    // console.log("navigationState", navigationState);
  }, []);

  // 대출 가능여부
  const [loanAvailable, setLoanAvailable] = useState<String>("Y");

  // API function - 11. 도서관별 도서 소장 여부 및 대출 가능여부 조회
  const getBookStatus = async (libCode: number, isbn13: number) => {
    return getWithURI(
      `http://data4library.kr/api/bookExist?authKey=${AUTHKEY}&libCode=${libCode}&isbn13=${isbn13}&format=json`
    );
  };

  // react-query : GET_BOOK_STATUS
  const { data: bookStatus, isLoading: bookStatusLoading } = useQuery(
    "GET_BOOK_STATUS",
    () => getBookStatus(libCode!, bookIsbn),
    {
      enabled: !isFromBookResult,
      onSuccess: (data) => {
        // console.log("data", data);

        if (data.response.result.loanAvailable == "Y") {
          setLoanAvailable("Y");
        } else {
          setLoanAvailable("N");
        }
      },
    }
  );

  // const onPressWishlist = (book_isbn: number) => {
  //   setFoundBook((prev) => {
  //     if (prev) {
  //       return {
  //         ...prev,
  //         is_wishlist: !prev.is_wishlist,
  //       };
  //     }
  //   });
  // };

  // useEffect(() => {
  //   // 검색어로 books 필터링
  //   const foundBook = books.find((book) => book.book_isbn === bookIsbn);
  //   setFoundBook(foundBook);
  //   console.log(foundBook);
  // }, []);

  return (
    <View style={styles.container}>
      {isFromBookResult ?? <SearchBar placeholder="노인과 바다" />}
      <DetailHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "NotoSansKR_Bold",
            color: colors.semiblack,
          }}
        >
          {isFromBookResult ? "도서 검색" : "도서 상세정보"}
        </Text>
      </DetailHeader>
      <BookItem
        // {...route.params.bookInfo}
        // isSearchResult={true}
        // isDetail={true}
        // is_loanAvailable={loanAvailable}
        // isFromBookResult={isFromBookResult}
        // // onPressWishlist={onPressWishlist}
        {...bookInfo}
        isFromBookResult={isFromBookResult}
        isSearchResult={true}
        isDetail={true}
        is_loanAvailable={loanAvailable}
      />
      <SearchLibraryContainer
        onPress={() => {
          setIsLookingForBook(true);
          navigation.navigate("SearchLibraryRoot", {
            screen: "SearchLibrary",
            params: {
              bookInfo: foundBook,
              // previousScreen:
              //   navigationState.routes[navigationState.routes.length - 1].name,
            },
          });
          // navigation.navigate("SearchLibrary", {
          //   bookIsbn: foundBook?.book_isbn,
          //   bookName: foundBook?.book_name,
          //   // isFromDetail: true,
          // });
        }}
      >
        <Feather name="search" size={24} color="#000" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
            fontFamily: "NotoSansKR_Bold",
            color: colors.semiblack,
          }}
        >
          현 도서 대출 가능한 도서관 보기
        </Text>
      </SearchLibraryContainer>
      <BookDescrptionContainer>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "NotoSansKR_Bold",
            marginBottom: 10,
            color: colors.semiblack,
          }}
        >
          도서 설명
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "NotoSansKR_Light",
            color: colors.gray4,
          }}
        >
          {foundBook?.book_description}
        </Text>
      </BookDescrptionContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
