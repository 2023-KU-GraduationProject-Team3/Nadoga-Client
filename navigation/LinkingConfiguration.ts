/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          SearchBookRoot: {
            screens: {
              SearchBookScreen: "SearchBook",
              SearchBookResultScreen: "SearchBookResult",
              SearchBookDetailScreen: "SearchBookDetail",
            },
          },
          SearchLibraryRoot: {
            screens: {
              SearchLibraryScreen: "SearchLibrary",
              SearchLibraryDetailScreen: "SearchLibraryDetail",
              SearchBookDetailScreen: "SearchBookDetail",
            },
          },

          MyLibraryRoot: {
            screens: {
              MyLibraryScreen: "MyLibrary",
              SearchBookDetailScreen: "SearchBookDetail",
              RatingScreen: "Rating",
            },
          },
          SettingsRoot: {
            screens: {
              SettingScreen: "Settings",
              UserInfoChangeScreen: "UserInfoChange",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
