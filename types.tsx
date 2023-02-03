/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<MainTabParamsList> | undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type MainTabParamsList = {
  SearchLibrary: undefined;
  SearchBook: undefined;
  MyPage: undefined;
};

export type RootTabScreenProps<Screen extends keyof MainTabParamsList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamsList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
