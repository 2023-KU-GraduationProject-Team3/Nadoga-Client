import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components/native";

// types
import {
  RootTabScreenProps,
  SearchLibraryDetailScreenProps,
  SearchLibraryScreenProps,
} from "../types";

import { BookProps } from "../components/Books/types";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// react-query
import { useQueries, useQuery } from "react-query";

// axios
import axios from "axios";

// apis
import { getWithURI } from "../apis/data4library";
import { getWishlistById } from "../apis/wishlist";
import { getReviewByUserId } from "../apis/review";

// icons
import { Ionicons } from "@expo/vector-icons";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// components
import PopularBooksHeader from "../components/Header/PopularBooksHeader";
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

export default function SearchLibraryDetail({
  navigation,
  route,
}: SearchLibraryDetailScreenProps) {
  const libCode = route.params.libCode;
  const [libInfo, setLibInfo] = useState();
  const [popularBooks, setPopularBooks] = useState([]);

  const { user } = useContext(UserContext);

  // const [user.user_age, setUserAge] = useState(user.user_age);
  // const [user.user_gender, setUserGender] = useState(user.user_gender); // 0 : 남성, 1 : 여성

  useEffect(() => {
    console.log(user);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      setPopularBooks([]);
      fetchPopularBook().then((data) => {
        console.log("fetchLibraryDetail", data);

        Promise.all([
          getWishlistById(user.user_id),
          getReviewByUserId(user.user_id),
        ]).then((values) => {
          const books = data.response.docs;
          const updatedPopularBooks: Array<BookProps> = [];
          // 인기 대출 목록 - 사용자의 나이와 성별에 맞게
          books.map((item: any) => {
            const bookInfo = item.doc;
            // let bookIsbn = Number(item.isbn);
            // console.log("bookIsbn", bookIsbn);

            if (updatedPopularBooks.length < 12) {
              let bookDetail = {
                isbn13: bookInfo.isbn13,
                bookname: bookInfo.bookname,
                authors: bookInfo.authors,
                publisher: bookInfo.publisher,
                bookRating: values[1].some((item) => {
                  return Number(item.isbn) === Number(bookInfo.isbn13);
                })
                  ? values[1].find((item) => {
                      return Number(item.isbn) === Number(bookInfo.isbn13);
                    }).rating
                  : "-",
                bookImageURL: bookInfo.bookImageURL,
                isWishlist: values[0].some((item) => {
                  return Number(item.isbn) === bookInfo.isbn13;
                }),
              };

              // getBookStatus(libCode, bookInfo.isbn13).then((data) => {
              //   let bookStatus = data.response.result;

              //   // updatedPopularBooks.push({
              //   //   ...bookDetail,
              //   //   loanAvailable: bookStatus.loanAvailable,
              //   // });
              //   bookDetail = {
              //     ...bookDetail,
              //     isLoanAvailable: bookStatus.loanAvailable,
              //   };
              // });

              setPopularBooks((prev) => {
                return [...prev, bookDetail];
              });
              // getBookDetail(bookInfo.isbn13)
              //   .then((data) => {
              //     console.log("getBookDetail result", data);
              //     let book = data.response.detail[0].book;

              //     let bookDetail = {
              //       isbn13: book.isbn13,
              //       bookname: book.bookname,
              //       authors: book.authors,
              //       publisher: book.publisher,
              //       description: book.description,
              //       bookImageURL: book.bookImageURL,
              //       isWishlist: values[0].some((item) => {
              //         return Number(item.isbn) === bookIsbn;
              //       }),
              //       bookRating: values[1].some((item) => {
              //         return Number(item.isbn) === bookIsbn;
              //       })
              //         ? values[1].find((item) => {
              //             return Number(item.isbn) === bookIsbn;
              //           }).rating
              //         : "-",
              //     };
              //     return bookDetail;
              //   })
              //   .then((bookDetail) => {
              //     getBookStatus(libCode, bookIsbn).then((data) => {
              //       let bookStatus = data.response.result;

              //       updatedPopularBooks.push({
              //         ...bookDetail,
              //         loanAvailable: bookStatus.loanAvailable,
              //       });
              //     });
              //   });
            } else {
              return;
            }
          });
        });
        // setPopularBooks([...updatedPopularBooks]);
      });
    }, [])
  );

  // API function - 14. 도서관별 통합정보
  const fetchLibraryDetail = async () => {
    return getWithURI(
      `http://data4library.kr/api/extends/libSrch?authKey=${AUTHKEY}&format=json&libCode=${libCode}`
    );
  };

  // API function - 9. 도서관/지역별 인기대출 도서 조회
  const fetchPopularBook = async () => {
    // user의 나이별로, age(나이대)를 설정
    // 최대 9개 제공
    let age = 0;

    if (user.user_age >= 0 && user.user_age < 6) {
      // 영유아(0 - 5세)
      age = 0;
    } else if (user.user_age < 8) {
      // 유아(6 - 7세)
      age = 6;
    } else if (user.user_age < 14) {
      // 초등(8 - 13세)
      age = 8;
    } else if (user.user_age < 20) {
      // 청소년(14 - 19세)
      age = 14;
    } else if (user.user_age < 30) {
      // 20대
      age = 20;
    } else if (user.user_age < 40) {
      // 30대
      age = 30;
    } else if (user.user_age < 50) {
      // 40대
      age = 40;
    } else if (user.user_age < 60) {
      // 50대
      age = 50;
    } else {
      // 60대
      age = 60;
    }

    return getWithURI(
      `http://data4library.kr/api/loanItemSrchByLib?authKey=${AUTHKEY}&libCode=${libCode}&age=${age}&gender=${user.user_gender}&pageSize=12&pageNo=1&format=json`
    );
  };

  // react-query - GET_LIBRARY_DETAIL
  const getLibraryDetail = useQuery("GET_LIBRARY_DETAIL", fetchLibraryDetail, {
    onSuccess: (data) => {
      const libInfo = data.response.libs[0].lib.libInfo;
      setLibInfo({ ...libInfo });
    },
  });

  // API function - 11. 도서관별 도서 소장 여부 및 대출 가능여부 조회
  const getBookStatus = async (libCode: number, isbn13: number) => {
    return getWithURI(
      `http://data4library.kr/api/bookExist?authKey=${AUTHKEY}&libCode=${libCode}&isbn13=${isbn13}&format=json`
    );
  };

  // API function - 6. 도서 상세 조회
  const getBookDetail = async (bookIsbn: number) => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  // react-query - GET_POPULAR_BOOK
  const getPopularBook = useQuery("GET_POPULAR_BOOK", fetchPopularBook, {
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      // const books = data.response.docs;
      // const updatedPopularBooks: Array<BookProps> = [];
      // Promise.all([
      //   getWishlistById(user.user_id),
      //   getReviewByUserId(user.user_id),
      // ]).then((values) => {
      //   // 인기 대출 목록 - 사용자의 나이와 성별에 맞게
      //   books.map((item: any) => {
      //     // const bookInfo = item.doc;
      //     let bookIsbn = Number(item.isbn);
      //     console.log("bookIsbn", bookIsbn);
      //     if (updatedPopularBooks.length < 12) {
      //       // updatedPopularBooks.push({
      //       //   isbn13: bookInfo.isbn13,
      //       //   bookname: bookInfo.bookname,
      //       //   authors: bookInfo.authors,
      //       //   publisher: bookInfo.publisher,
      //       //   book_rating: 4.5,
      //       //   book_image_url: bookInfo.bookImageURL,
      //       //   is_wishlist: false,
      //       // });
      //       getBookDetail(bookIsbn)
      //         .then((data) => {
      //           console.log("getBookDetail result", data);
      //           let book = data.response.detail[0].book;
      //           let bookDetail = {
      //             isbn13: book.isbn13,
      //             bookname: book.bookname,
      //             authors: book.authors,
      //             publisher: book.publisher,
      //             description: book.description,
      //             bookImageURL: book.bookImageURL,
      //             isWishlist: values[0].some((item) => {
      //               return Number(item.isbn) === bookIsbn;
      //             }),
      //             bookRating: values[1].some((item) => {
      //               return Number(item.isbn) === bookIsbn;
      //             })
      //               ? values[1].find((item) => {
      //                   return Number(item.isbn) === bookIsbn;
      //                 }).rating
      //               : "-",
      //           };
      //           return bookDetail;
      //         })
      //         .then((bookDetail) => {
      //           getBookStatus(libCode, bookIsbn).then((data) => {
      //             let bookStatus = data.response.result;
      //             updatedPopularBooks.push({
      //               ...bookDetail,
      //               loanAvailable: bookStatus.loanAvailable,
      //             });
      //           });
      //         });
      //     } else {
      //       return;
      //     }
      //   });
      // });
      // setPopularBooks([...updatedPopularBooks]);
    },
  });
  return (
    <View style={styles.container}>
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
          {"도서관 정보"}
        </Text>
      </DetailHeader>

      {/* <PopularBooksHeader
        title={"도서관 상세정보"}
        description={"해당 도서관의 상세정보입니다."}
        titleTextStyle={{
          fontSize: 26,
          fontWeight: "900",
          color: colors.black,
          fontFamily: "NotoSansKR_Bold",
        }}
        descriptionTextStyle={{
          fontSize: 14,
          fontWeight: "normal",
          color: colors.black,
          fontFamily: "NotoSansKR_Regular",
        }}
      />
      <Text>{`도서관코드:${libCode}`}</Text>
      <Text>{`도서관명:${libInfo?.libName}`}</Text>
      <Text>{`주소:${libInfo?.address}`}</Text>
      <Text>{`전화번호:${libInfo?.tel}`}</Text>
      <Text>{`fax:${libInfo?.fax}`}</Text>
      <Text>{`홈페이지:${libInfo?.homepage}`}</Text>
      <View style={styles.separator}></View> */}

      <ImageBackground
        style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        source={require("../assets/images/library-info.png")}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 50,
            bottom: 20,
          }}
          onPress={() => {
            Alert.alert("주소", libInfo?.homepage);
          }}
        >
          <Image
            source={require("../assets/icons/library/library-home.png")}
          ></Image>
        </TouchableOpacity>
        <Image
          style={{
            position: "absolute",
            left: 20,
          }}
          source={require("../assets/icons/library/library-marker.png")}
        ></Image>
        <Text
          style={{
            position: "absolute",
            left: 20,
            bottom: 40,
            fontSize: 26,
            fontWeight: "900",
            color: colors.white,
            fontFamily: "NotoSansKR_Bold",
          }}
        >
          {libInfo?.libName}
        </Text>
        <Text
          style={{
            position: "absolute",
            left: 20,
            bottom: 5,
            fontSize: 14,
            fontWeight: "normal",
            color: colors.white,
            fontFamily: "NotoSansKR_Regular",
          }}
        >
          {libInfo?.address}
        </Text>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            bottom: 20,
          }}
          onPress={() => {
            Alert.alert("전화번호", libInfo?.tel);
          }}
        >
          <Image
            source={require("../assets/icons/library/library-tel.png")}
          ></Image>
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <PopularBooksHeader
          title={"인기 대출 도서"}
          description={`해당 도서관의 ${user.user_age + "세"} ${
            user.user_gender === 0 ? "남성" : "여성"
          } 인기대출목록입니다.`}
          titleTextStyle={{
            fontSize: 26,
            fontWeight: "900",
            color: colors.black,
            fontFamily: "NotoSansKR_Bold",
            paddingLeft: 20,
          }}
          descriptionTextStyle={{
            fontSize: 14,
            fontWeight: "normal",
            color: colors.black,
            fontFamily: "NotoSansKR_Regular",
            paddingLeft: 20,
          }}
        />

        {getPopularBook.isFetching ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 300,
              backgroundColor: colors.bgGray,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={popularBooks}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
            libCode={libCode}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: colors.bgGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: colors.bgGray,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
    backgroundColor: colors.bgGray,
  },
});
