import { useEffect, useState, useCallback, useContext } from "react";
import React, { StyleSheet, View, Text, Alert } from "react-native";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";

import Geolocation from "@react-native-community/geolocation";

// constants
import { colors } from "../constants/Colors";

// components
import MyInfo from "../components/Header/MyInfo";
import MyLibraryHeader from "../components/Header/MyLibraryHeader";
import BookSection from "../components/Books/BookSection";
import Test from "../components/test";

// types
import { MyLibraryScreenProps } from "../types";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// apis
import { getWishlistById, addWishlist, deleteWishlist } from "../apis/wishlist";
import { getReviewByUserId } from "../apis/review";
import { getWithURI } from "../apis/data4library";
import { getSearchByUserId, deleteSearch } from "../apis/search";

// useContext
import UserContext from "../context/userContext";

// react-query
import { useQuery } from "react-query";

export default function MyLibrary({ navigation, route }: MyLibraryScreenProps) {
  const [menuNum, setMenuNum] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [review, setReview] = useState([]);

  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  const {
    user,
    setUser,
    lookingBookInfo,
    isLookingForBook,
    setIsLookingForBook,
    closestLibraryList,
    setClosestLibraryList,
    isLoanList,
    setIsLoanList,
    logoutUser,
  } = useContext(UserContext);

  const handleMenuNum = (num: number) => {
    setMenuNum(num);
  };

  const handleModal = () => {
    setIsModal(true);
  };

  const handleAddWishlist = (userId: string, book_isbn: number) => {
    addWishlist(userId, book_isbn);
  };

  const handleDeleteWishlist = (userId: string, book_isbn: number) => {
    deleteWishlist(userId, book_isbn);
    navigation.navigate("MyLibrary");
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    if (lat1 == lat2 && lon1 == lon2) return 0;

    var radLat1 = (Math.PI * lat1) / 180;
    var radLat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radTheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
  };

  // API function - 6. 도서 상세 조회
  const getBookDetail = async (bookIsbn: number) => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  // API function - 1. 정보공개 도서관 조회
  const fetchLibraryData = () => {
    return getWithURI(
      `http://data4library.kr/api/libSrch?authKey=${AUTHKEY}&pageSize=1480&region=11&format=json`
    );
  };

  // GET_LIBRARY
  const { data, isLoading, refetch, isFetched, isFetching } = useQuery(
    "GET_LIBRARY",
    fetchLibraryData,
    {
      onSuccess: (data) => {
        // alert("GET_LIBRARY");
        const libArray = data.response.libs;
        // console.log("libArray: ", libArray[0]);

        let sortedMarkers: Array<Object> = [];

        // isFetched &&
        libArray.map((item: any, index: number) => {
          const distance = getDistance(
            Number(item.lib.latitude),
            Number(item.lib.longitude),
            position.latitude,
            position.longitude
          );
          // console.log(distance);
          let libObj = {
            id: item.lib.isbn13,
            libCode: item.lib.libCode,
            coordinate: {
              latitude: Number(item.lib.latitude),
              longitude: Number(item.lib.longitude),
            },
            title: item.lib.libName,
            distance: distance / 1000,
            image: require("../assets/images/map/library_1.png"),
          };

          if (distance <= 3000 && sortedMarkers.length < 5) {
            //setMarkers((markers) => [...markers, libObj]);
            sortedMarkers.push(libObj);

            if (sortedMarkers.length === 5) {
              sortedMarkers.sort((a, b) => {
                return a.distance - b.distance;
              });

              setClosestLibraryList(sortedMarkers);
            }
          }
        });
      },
    }
  );

  const getPreviousData = async () => {
    const [data1, data2] = await Promise.all([
      getWishlistById(user.user_id),
      getReviewByUserId(user.user_id),
    ]);
    setWishlist(data1);
    setReview(data2);
  };

  useFocusEffect(
    useCallback(() => {
      setWishlistData([]);
      setReviewData([]);
      setSearchData([]);

      setIsWishlistLoaded(false);
      getCurrentPos();
      refetch();
      console.log("user_id", user.user_id);

      Promise.all([
        getWishlistById(user.user_id),
        getReviewByUserId(user.user_id),
      ]).then((values) => {
        getWishlistById(user.user_id).then((data) => {
          data.map((item) => {
            let bookIsbn = Number(item.isbn);

            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;
              let bookDetail = {
                isbn13: book.isbn13,
                bookname: book.bookname,
                authors: book.authors,
                publisher: book.publisher,
                description: book.description,
                bookImageURL: book.bookImageURL,
                bookRating: values[1].some((item) => {
                  return Number(item.isbn) === bookIsbn;
                })
                  ? values[1].find((item) => {
                      return Number(item.isbn) === bookIsbn;
                    }).rating
                  : "-",
                isWishlist: true,
                createdAt: item.createdAt,
              };

              setWishlistData((prev) => [...prev, bookDetail]);
              // updatedWishlistData.push(bookDetail);
            });
          });
        });
        getReviewByUserId(user.user_id).then((data) => {
          data.map((item) => {
            let bookIsbn = Number(item.isbn);

            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;

              let bookDetail = {
                isbn13: book.isbn13,
                bookname: book.bookname,
                authors: book.authors,
                publisher: book.publisher,
                description: book.description,
                bookImageURL: book.bookImageURL,
                bookRating: item.rating,
                isWishlist: values[0].some((item) => {
                  return Number(item.isbn) === bookIsbn;
                }),
                createdAt: item.createdAt,
              };

              setReviewData((prev) => [...prev, bookDetail]);
              // updatedReviewData.push(bookDetail);
            });
          });
        });
        getSearchByUserId(user.user_id).then((data) => {
          data.map((item) => {
            let bookIsbn = Number(item.isbn);

            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;

              let bookDetail = {
                isbn13: book.isbn13,
                bookname: book.bookname,
                authors: book.authors,
                publisher: book.publisher,
                description: book.description,
                bookImageURL: book.bookImageURL,
                isWishlist: values[0].some((item) => {
                  return Number(item.isbn) === bookIsbn;
                }),
                bookRating: values[1].some((item) => {
                  return Number(item.isbn) === bookIsbn;
                })
                  ? values[1].find((item) => {
                      return Number(item.isbn) === bookIsbn;
                    }).rating
                  : "-",
                createdAt: item.createdAt,
              };

              // wishlistData.some((item) => {
              //   if (item.isbn13 === bookDetail.isbn13) {
              //     bookDetail["isWishlist"] = true;
              //   }
              // });

              setSearchData((prev) => [...prev, bookDetail]);
              // updatedReviewData.push(bookDetail);
            });
          });
        });
      });

      // Promise.all([
      //   getWishlistById(user.user_id),
      //   getReviewByUserId(user.user_id),
      // ]).then((values) => {
      //   // wishlist : values[0]
      //   // review : values[1]

      // });

      // order by created_at

      // updatedWishlistData.sort((a, b) => {
      //   return a.book_isbn - b.book_isbn;
      // });

      // setWishlistData([...updatedWishlistData]);

      // console.log("wishlistdata", wishlistData);
      // console.log("wishlistdata length", wishlistData.length);

      setTimeout(() => {
        setIsWishlistLoaded(true);
        console.log("isWishlistLoaded", isWishlistLoaded);
      }, 1000);
    }, [])
  );
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const getCurrentPos = () => {
    Geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition((pos) => ({
        ...pos,
        latitude,
        longitude,
        latitudeDelta: position.latitudeDelta,
        longitudeDelta: position.longitudeDelta,
      }));

      // user position 구했으니, marker 데이터 불러오기 가능
      //refetch();
      console.log("position", position);
    });
  };

  const handlePressHold = (isbn13) => {
    Alert.alert(
      "알림",
      "현 책을 검색기록에서 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            deleteSearch(user.user_id, isbn13).then((data) => {
              console.log("deleteSearchByUserId", data);
              setSearchData((prev) => {
                return prev.filter(
                  (item) => Number(item.isbn13) !== Number(isbn13)
                );
              });
            });
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <MyInfo
        name="신성준"
        email="shinsj4653@gmail.com"
        profile_img_url="../../assets/images/icon.png"
        wishlist_num={10}
        search_num={10}
        nameTextStyle={styles.name}
        emailTextStyle={styles.email}
        menuNum={menuNum}
        handleMenuNum={handleMenuNum}
        handleModal={handleModal}
      />
      <MyLibraryHeader
        title={
          menuNum === 0 ? "찜목록" : menuNum === 1 ? "평가 목록" : "검색 목록"
        }
        description={
          menuNum === 0
            ? "찜하기를 누른 도서 목록입니다."
            : menuNum === 1
            ? "평가한 도서 목록입니다."
            : "검색한 도서 목록입니다."
        }
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
      ></MyLibraryHeader>
      {!isWishlistLoaded ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>불러오는 중...</Text>
        </View>
      ) : isWishlistLoaded && wishlistData.length === 0 && menuNum === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>찜을 한 도서가 존재하지 않습니다.</Text>
        </View>
      ) : menuNum === 1 && reviewData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>평가를 한 도서가 존재하지 않습니다.</Text>
        </View>
      ) : menuNum === 2 && searchData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>검색을 한 도서가 존재하지 않습니다.</Text>
        </View>
      ) : (
        <BookSection
          books={
            menuNum === 0
              ? wishlistData
              : menuNum === 1
              ? reviewData
              : searchData
          }
          isSearchResult={false}
          isFromBookResult={true}
          isDetail={false}
          isMyLibrary={true}
          menuNum={menuNum}
          addWishlist={handleAddWishlist}
          deleteWishlist={handleDeleteWishlist}
          handlePressHold={handlePressHold}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
  },
  name: {
    fontSize: 26,
    fontFamily: "NotoSansKR_Bold",
    color: colors.semiblack,
  },
  email: {
    fontSize: 12,
    fontFamily: "NotoSansKR_Bold",
    color: colors.gray4,
    marginTop: -25,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
