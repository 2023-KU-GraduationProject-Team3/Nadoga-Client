import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants/Colors";
import { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 170px;
  height: 50px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin: 10px 220px 0 0;
  padding-left: 30px;
`;

// useContext
import UserContext from "../context/userContext";

// types
import { SearchBookResultScreenProps } from "../types";
import { BookProps } from "../components/Books/types";

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";
import React from "react";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// apis
import { getWithURI } from "../apis/data4library";
import {
  getWishlistById,
  getIsWishlist,
  addWishlist,
  deleteWishlist,
} from "../apis/wishlist";
import { addSearch } from "../apis/search";
import { getReviewByUserId } from "../apis/review";

export default function SearchBookResult({
  navigation,
  route,
}: SearchBookResultScreenProps) {
  const [bookName, setBookName] = useState<string>(route.params.bookName);

  const [isKeywordBooksLoaded, setIsKeywordBooksLoaded] =
    useState<boolean>(false);

  const [isWishlistLoaded, setIsWishlistLoaded] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState();
  const [reviewlist, setReviewlist] = useState();

  const handleAddWishlist = (userId: string, book_isbn: number) => {
    addWishlist(userId, book_isbn);
    //updateWishlist();
    // setWishlist([...wishlist, { isbn: book_isbn }]);
  };

  const handleDeleteWishlist = (userId: string, book_isbn: number) => {
    // updateWishlist();
    deleteWishlist(userId, book_isbn);
  };

  const handleSearch = (userId: string, book_isbn: number) => {
    addSearch(userId, book_isbn);
  };

  const updateWishlist = () => {
    setIsWishlistLoaded(false);

    Promise.all([
      getWishlistById(user.user_id),
      getReviewByUserId(user.user_id),
    ])
      .then((res) => {
        setWishlist(res[0]);
        setReviewlist(res[1]);
        setIsWishlistLoaded(true);
      })
      .then(() => {
        refetch();
      });
  };

  useFocusEffect(
    useCallback(() => {
      setIsKeywordBooksLoaded(false);
      setKeywordBooks([]);
      Promise.all([
        getWishlistById(user.user_id),
        getReviewByUserId(user.user_id),
      ])
        .then((res) => {
          setWishlist(res[0]);
          setReviewlist(res[1]);
        })
        .then(() => {
          refetch();
        });

      setBookName(route.params.bookName);

      setTimeout(() => {
        setIsKeywordBooksLoaded(true);
        console.log("isWishlistLoaded", isKeywordBooksLoaded);
      }, 1000);
    }, [])
  );

  useEffect(() => {}, [isWishlistLoaded]);

  const [keywordBooks, setKeywordBooks] = useState<Array<BookProps>>();

  // API function - 16. 도서 검색
  const fetchBookWithKeyword = async (bookName: string) => {
    return getWithURI(
      `http://data4library.kr/api/srchBooks?authKey=${AUTHKEY}&keyword=${bookName}&pageNo=1&pageSize=1000&format=json`
    );
  };

  // const checkIsWishlist = (book_isbn: number): boolean => {
  //   console.log("checkiswishlist", book_isbn);

  //   wishlist.map((item) => {
  //     if (Number(item.isbn) === Number(book_isbn)) {
  //       return true;
  //     }
  //   });
  //   return false;
  // };

  // react-query - GET_BOOKS_WITH_KEYWORD
  const { data, isLoading, isError, refetch } = useQuery(
    "GET_BOOKS_WITH_KEYWORD",
    () => fetchBookWithKeyword(bookName),
    {
      enabled: isKeywordBooksLoaded,
      onSuccess: (data) => {
        const books = data.response.docs;
        const keywordBooks: Array<BookProps> = [];

        books.map((item: any) => {
          if (keywordBooks.length >= 10) {
            // 최대 20개 까지만
            return;
          }

          const bookInfo = item.doc;
          // let bookItem = {
          //   isbn13: bookInfo.isbn13,
          //   bookname: bookInfo.bookname,
          //   authors: bookInfo.authors,
          //   publisher: bookInfo.publisher,
          //   bookImageURL: bookInfo.bookImageURL,
          //   bookRating: 4.5,
          //   isWishlist: checkIsWishlist(bookInfo.isbn13),
          // };
          // if (index < 10) {
          //   setKeywordBooks((prev) => [...prev, bookItem]);
          // }

          keywordBooks.push({
            isbn13: bookInfo.isbn13,
            bookname: bookInfo.bookname,
            authors: bookInfo.authors,
            publisher: bookInfo.publisher,
            bookImageURL: bookInfo.bookImageURL,
            bookRating: reviewlist.some((item) => {
              return Number(item.isbn) === Number(bookInfo.isbn13);
            })
              ? reviewlist.find((item) => {
                  return Number(item.isbn) === Number(bookInfo.isbn13);
                }).rating
              : "-",
            isWishlist: wishlist.some((wishlistItem) => {
              return Number(wishlistItem.isbn) === Number(bookInfo.isbn13);
            }),
          });
        });
        setKeywordBooks([...keywordBooks]);
      },
    }
  );

  useEffect(() => {
    // alert(bookName);
  }, []);

  // const handleSearchBookResult = () => {
  //   // setBookName(bookName);
  //   refetch();
  // };
  const handleSearchBookResult = () => {
    navigation.navigate("SearchBookResult", {
      bookName,
      // wishlist: wishlist,
      // getWishlist: getWishlist,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="도서명을 입력해주세요"
        searchValue={bookName}
        setSearchValue={setBookName}
        handleSearch={handleSearchBookResult}
      />

      {isKeywordBooksLoaded && keywordBooks?.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>검색 결과가 없습니다.</Text>
        </View>
      ) : isKeywordBooksLoaded ? (
        <BookSection
          books={keywordBooks}
          isSearchResult={true}
          isFromBookResult={true}
          isDetail={false}
          bookName={bookName}
          addWishlist={handleAddWishlist}
          deleteWishlist={handleDeleteWishlist}
          updateWishlist={updateWishlist}
          addSearch={handleSearch}
          isMyLibrary={false}
          menuNum={3}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>도서 검색 결과 불러오는 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
    paddingTop: 70,
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
