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
          SearchBook: {
            screens: {
              SearchBookScreen: "SearchBook",
            },
          },
          SearchLibrary: {
            screens: {
              SearchLibraryScreen: "SearchLibrary",
            },
          },

          MyLibrary: {
            screens: {
              MyLibraryScreen: "MyLibrary",
            },
          },
          Settings: {
            screens: {
              SettingScreen: "Settings",
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
