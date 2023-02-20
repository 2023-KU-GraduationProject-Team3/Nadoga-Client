import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import React, { useState } from "react";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { Auth } from "./navigation";

import { useFonts } from "expo-font";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isLogin, setIsLogin] = useState(true);

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
        {isLogin ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <Auth colorScheme={colorScheme} />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
