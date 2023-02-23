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
  SearchLibrary: undefined;
  MyLibrary: undefined;
  Settings: undefined;
};

export type SearchBookParamsList = {
  SearchBook: undefined;
  SearchBookResult: {
    bookName: string;
  };
  SearchBookDetail: {
    bookIsbn: number;
  };
};

export type SearchBookScreenProps = NativeStackScreenProps<
  SearchBookParamsList,
  "SearchBook"
>;

export type SearchBookResultScreenProps = NativeStackScreenProps<
  SearchBookParamsList,
  "SearchBookResult"
>;

export type SerachBookDetailScreenProps = NativeStackScreenProps<
  SearchBookParamsList,
  "SearchBookDetail"
>;

export type RootTabScreenProps<Screen extends keyof MainTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
