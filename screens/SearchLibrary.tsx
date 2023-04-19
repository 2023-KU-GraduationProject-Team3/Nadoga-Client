import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import MapViewComponent from "../components/Map/MapViewComponent";
import SearchBar from "../components/SearchBar/SearchBar";

import styled from "styled-components/native";
import Geolocation from "@react-native-community/geolocation";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// components
const MyLocationButton = styled.TouchableOpacity`
  position: absolute;
  top: 110px;
  right: 20px;
`;

const ShowClosestLibraryButton = styled.TouchableOpacity`
  position: absolute;
  top: 160px;
  right: 20px;
  background-color: ${colors.white};
`;

const CurrentBookSection = styled.View`
  position: absolute;
  bottom: 180px;
  left: 20px;
  width: ${Layout.window.width - 40}px;
  height: 50px;
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// apis
import { getWithURI } from "../apis/data4library";

// types
import { RootTabScreenProps, SearchLibraryScreenProps } from "../types";

const SPACING_FOR_CARD_INSET = Layout.window.width * 0.05 - 10;
const CARD_WIDTH = Layout.window.width - 40;

// context
import UserContext from "../context/userContext";

export default function SearchLibrary({
  navigation,
  route,
}: SearchLibraryScreenProps) {
  return <MapViewComponent></MapViewComponent>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    padding: 15,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: colors.black,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: Layout.window.height / 5,
    width: Layout.window.width - 40,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
  },
  cardImage: {
    width: "45%",
    height: "100%",
    borderRadius: 10,
  },
  cardTextContainer: {
    flexDirection: "column",
    width: "55%",
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  cardTextDistanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "30%",
  },
});
