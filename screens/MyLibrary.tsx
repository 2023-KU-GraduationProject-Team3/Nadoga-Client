import { useEffect, useState, useCallback, useContext } from "react";
import React, { StyleSheet, View, Text, Alert } from "react-native";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";

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
import { getWithURI } from "../apis/data4library";

// useContext
import UserContext from "../context/userContext";

export default function MyLibrary({ navigation, route }: MyLibraryScreenProps) {
  const [menuNum, setMenuNum] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);

  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  const { user, logoutUser } = useContext(UserContext);

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
          deleteWishlist(userId, book_isbn);
          navigation.navigate("MyLibrary");
        },
      },
    ]);
  };

  // recommend Result
  // const recommendResult = [
  //   {
  //     book_isbn: 9791133469727,
  //     book_name: "노인과 바다1",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791130635712,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다2",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791164137176,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다3",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791133469727,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791164137879,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791130637594,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791161722344,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 9791188862290,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 8809264181522,
  //     book_publisher: "출판사아",
  //     book_name: "노인과 바다",
  //     book_author: "헤밍웨이",
  //     book_image_url:
  //       "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  // ];

  // API function - 6. 도서 상세 조회
  const getBookDetail = async (bookIsbn: number) => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  useFocusEffect(
    useCallback(() => {
      setWishlistData([]);
      setIsWishlistLoaded(false);
      console.log("user_id", user.user_id);

      getWishlistById(user.user_id).then((data) => {
        data.map((item) => {
          let bookIsbn = Number(item.isbn);

          getBookDetail(bookIsbn).then((data) => {
            let book = data.response.detail[0].book;
            let bookDetail = {
              book_isbn: book.isbn13,
              book_name: book.bookname,
              book_author: book.authors,
              book_publisher: book.publisher,
              book_description: book.description,
              book_image_url: book.bookImageURL,
              book_rating: 0.0,
              is_wishlist: true,
              createdAt: item.createdAt,
            };

            setWishlistData((prev) => [...prev, bookDetail]);
            // updatedWishlistData.push(bookDetail);
          });
        });
      });

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
      }, 2000);
    }, [])
  );

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
      ) : isWishlistLoaded && wishlistData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>찜을 한 도서가 존재하지 않습니다.</Text>
        </View>
      ) : (
        <BookSection
          books={menuNum === 0 ? wishlistData : recommendResult}
          isSearchResult={false}
          isFromBookResult={true}
          isDetail={false}
          addWishlist={handleAddWishlist}
          deleteWishlist={handleDeleteWishlist}
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
