/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  AfterScreen: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<MainTabParamsList> | undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type MainTabParamsList = {
  SearchBookRoot: undefined;
  SearchLibraryRoot: undefined;
  MyLibraryRoot: undefined;
  Settings: undefined;
};

export type SearchBookParamsList = {
  SearchBook: undefined;
  SearchBookResult: {
    bookName: string;
  };
  SearchBookDetail: {
    bookIsbn: number;
    libCode?: number;
    isFromBookResult: boolean;
  };
  // SearchLibrary: {
  //   bookIsbn: number;
  //   bookName?: string;
  // };
  // SearchLibraryDetail: {
  //   libCode: number;
  // };
  Rating: {
    bookIsbn: number;
    bookName: string;
  };
};

export type SearchLibraryParamsList = {
  SearchLibrary: {
    bookIsbn: number;
    bookName?: string;
    isFromDetail?: boolean;
  };
  SearchLibraryDetail: {
    libCode: number;
  };
  SearchBookDetail: {
    bookIsbn: number;
    libCode?: number;
    isFromBookResult: boolean;
  };
  Rating: {
    bookIsbn: number;
    bookName: string;
  };
};

export type MyLibraryParamsList = {
  MyLibrary: undefined;
  SearchBookDetail: {
    bookIsbn: number;
    libCode?: number;
    isFromBookResult: boolean;
  };
  Rating: {
    bookIsbn: number;
    bookName: string;
  };
  Statistics: undefined;
};

export type SettingParamsList = {
  Setting: undefined;
  UserInfoChange: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Login"
>;

export type SignUpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "SignUp"
>;

export type SearchBookScreenProps = NativeStackScreenProps<
  SearchBookParamsList,
  "SearchBook"
>;

export type SearchBookResultScreenProps = NativeStackScreenProps<
  SearchBookParamsList,
  "SearchBookResult"
>;

export type SerachBookDetailScreenProps = NativeStackScreenProps<
  SearchBookParamsList | MyLibraryParamsList,
  "SearchBookDetail"
>;

export type SearchLibraryScreenProps = NativeStackScreenProps<
  SearchLibraryParamsList,
  "SearchLibrary"
>;

export type SearchLibraryDetailScreenProps = NativeStackScreenProps<
  SearchLibraryParamsList,
  "SearchLibraryDetail"
>;

export type MyLibraryScreenProps = NativeStackScreenProps<
  MyLibraryParamsList,
  "MyLibrary"
>;

export type RatingScreenProps = NativeStackScreenProps<
  MyLibraryParamsList,
  "Rating"
>;

export type StatisticsScreenProps = NativeStackScreenProps<
  MyLibraryParamsList,
  "Statistics"
>;

export type SettingScreenProps = NativeStackScreenProps<
  SettingParamsList,
  "Setting"
>;

export type UserInfoChangeScreenProps = NativeStackScreenProps<
  SettingParamsList,
  "UserInfoChange"
>;

export type RootTabScreenProps<Screen extends keyof MainTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
