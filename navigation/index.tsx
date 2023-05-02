/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image, View, Text } from "react-native";

import { colors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/Modal";
import SearchLibrary from "../screens/SearchLibrary";
import SearchLibraryDetail from "../screens/SearchLibraryDetail";
import NotFoundScreen from "../screens/NotFound";
import SearchBookScreen from "../screens/SearchBook";
import MyLibraryScreen from "../screens/MyLibrary";
import SettingScreen from "../screens/Settings";
import {
  RootStackParamList,
  MainTabParamsList,
  RootTabScreenProps,
  AuthStackParamList,
  SearchBookParamsList,
  SearchLibraryParamsList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/SignUp";
import AfterScreen from "../screens/AfterScreen";
import SearchBookResult from "../screens/SearchBookResult";
import SearchBookDetail from "../screens/SearchBookDetail";
import Rating from "../screens/Rating";
import PopularBookDetail from "../screens/PopularBookDetail";
import MyLibrary from "../screens/MyLibrary";
import UserInfoChange from "../screens/UserInfoChange";
import Statistics from "../screens/Statistics";

// import SearchLibraryIcon from '../assets/icons/searchLibrary';

export function Auth({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <AuthNavigator />
    </NavigationContainer>
  );
}
export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <MainTabNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const MainStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const SearchBookStack = createNativeStackNavigator<SearchBookParamsList>();
const SearchLibraryStack =
  createNativeStackNavigator<SearchLibraryParamsList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="After"
        component={AfterScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <MainStack.Group screenOptions={{ presentation: "modal" }}>
        <MainStack.Screen name="Modal" component={ModalScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
}

function SerachBookNavigator() {
  return (
    <SearchBookStack.Navigator initialRouteName="SearchBook">
      <SearchBookStack.Screen
        name="SearchBook"
        component={SearchBookScreen}
        options={{ headerShown: false }}
      />
      <SearchBookStack.Screen
        name="SearchBookResult"
        component={SearchBookResult}
        options={{ headerShown: false }}
      />
      <SearchBookStack.Screen
        name="SearchBookDetail"
        component={SearchBookDetail}
        options={{ headerShown: false }}
      />
      <SearchBookStack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
    </SearchBookStack.Navigator>
  );
}

function SearchLibraryNavigator() {
  return (
    <SearchLibraryStack.Navigator initialRouteName="SearchLibrary">
      <SearchLibraryStack.Screen
        name="SearchLibrary"
        component={SearchLibrary}
        initialParams={{
          bookIsbn: 0,
          bookName: "",
          isFromDetail: false,
        }}
        options={{ headerShown: false }}
      />
      <SearchLibraryStack.Screen
        name="SearchLibraryDetail"
        component={SearchLibraryDetail}
        options={{ headerShown: false }}
      />
      <SearchLibraryStack.Screen
        name="SearchBookDetail"
        component={SearchBookDetail}
        options={{ headerShown: false }}
      />
      <SearchBookStack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
    </SearchLibraryStack.Navigator>
  );
}

function MyLibraryNavigator() {
  return (
    <SearchLibraryStack.Navigator initialRouteName="MyLibrary">
      <SearchLibraryStack.Screen
        name="MyLibrary"
        component={MyLibrary}
        options={{ headerShown: false }}
      />

      <SearchLibraryStack.Screen
        name="SearchBookDetail"
        component={SearchBookDetail}
        options={{ headerShown: false }}
      />
      <SearchLibraryStack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
      <SearchLibraryStack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
    </SearchLibraryStack.Navigator>
  );
}

function SettingNavigator() {
  return (
    <SearchLibraryStack.Navigator initialRouteName="Setting">
      <SearchLibraryStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />

      <SearchLibraryStack.Screen
        name="UserInfoChange"
        component={UserInfoChange}
        options={{ headerShown: false }}
      />
    </SearchLibraryStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<MainTabParamsList>();

function BottomTabNavigator() {
  // const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SearchBookRoot"
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.black,
        tabBarActiveBackgroundColor: colors.green,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarStyle: {
          height: 80,
          paddingLeft: 20,
          paddingRight: 20,
        },
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="SearchBookRoot"
        component={SerachBookNavigator}
        options={{
          title: "도서 검색",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/searchbook-icon.png")}
              style={{
                width: 36,
                height: 36,
                tintColor: focused ? colors.white : colors.black,
                paddingBottom: 0,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchLibraryRoot"
        component={SearchLibraryNavigator}
        options={{
          title: "도서관 찾기",

          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/searchlibrary-icon.png")}
              style={{
                width: 36,
                height: 36,
                tintColor: focused ? colors.white : colors.black,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyLibraryRoot"
        component={MyLibraryNavigator}
        options={{
          title: "나의 서재",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/mylibrary-icon.png")}
              style={{
                width: 36,
                height: 36,
                tintColor: focused ? colors.white : colors.black,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingsRoot"
        component={SettingNavigator}
        options={{
          title: "설정",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/settings-icon.png")}
              style={{
                width: 36,
                height: 36,
                tintColor: focused ? colors.white : colors.black,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
