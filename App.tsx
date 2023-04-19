import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import React, { useState, useContext } from "react";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { Auth } from "./navigation";

import { useFonts } from "expo-font";

// react query
import { QueryClient, QueryClientProvider } from "react-query";
import UserContext from "./context/userContext";
import BookContext from "./context/bookContext";
const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState({
    user_id: "",
    user_email: "",
    user_name: "",
    user_gender: 0,
    user_age: 0,
    user_genre: "",
    is_login: false,
  });

  const [isLookingForBook, setIsLookingForBook] = useState(false);
  const [lookingBookInfo, setLookingBookInfo] = useState({
    book_isbn: "",
    book_name: "",
    book_author: "",
    book_publisher: "",
    book_description: "",
    book_image_url: "",
    book_rating: 0,
    is_wishlist: false,
  });

  const [closestLibraryList, setClosestLibraryList] = useState([]);
  const [isLoanList, setIsLoanList] = useState(false);

  const loginUser = (userInfo: {
    id: any;
    email: any;
    name: any;
    age: any;
    gender: any;
    genre: any;
  }): void => {
    setUser({
      user_id: userInfo.id,
      user_email: userInfo.email,
      user_name: userInfo.name,
      user_age: userInfo.age,
      user_gender: userInfo.gender,
      user_genre: userInfo.genre,
      is_login: true,
    });
  };

  const logoutUser = (userInfo: {
    id: any;
    email: any;
    name: any;
    age: any;
    gender: any;
    genre: any;
  }): void => {
    setUser({
      user_id: userInfo.id,
      user_email: userInfo.email,
      user_name: userInfo.name,
      user_age: userInfo.age,
      user_gender: userInfo.gender,
      user_genre: userInfo.genre,
      is_login: false,
    });
  };

  const [fontsLoaded] = useFonts({
    NotoSansKR_Black: require("./assets/fonts/NotoSansKR-Black.otf"),
    NotoSansKR_Bold: require("./assets/fonts/NotoSansKR-Bold.otf"),
    NotoSansKR_Light: require("./assets/fonts/NotoSansKR-Light.otf"),
    NotoSansKR_Medium: require("./assets/fonts/NotoSansKR-Medium.otf"),
    NotoSansKR_Regular: require("./assets/fonts/NotoSansKR-Regular.otf"),
    NotoSansKR_Thin: require("./assets/fonts/NotoSansKR-Thin.otf"),
    Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Poppins_Regular: require("./assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider
            value={{
              user,
              loginUser,
              logoutUser,
              isLookingForBook,
              setIsLookingForBook,
              lookingBookInfo,
              setLookingBookInfo,
              closestLibraryList,
              setClosestLibraryList,
              isLoanList,
              setIsLoanList,
            }}
          >
            {/* {user.is_login ? (
              <Navigation colorScheme={colorScheme} />
            ) : (
              <Auth colorScheme={colorScheme} />
            )} */}

            {user.is_login ? (
              <Navigation colorScheme={colorScheme} />
            ) : (
              <Auth colorScheme={colorScheme} />
            )}

            <StatusBar />
          </UserContext.Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
