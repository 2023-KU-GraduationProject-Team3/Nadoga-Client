import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Platform,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MapViewComponent from "../components/Map/MapViewComponent";
import SearchBar from "../components/SearchBar/SearchBar";
import { RootTabScreenProps } from "../types";
import styled from "styled-components/native";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// components
const MyLocationButton = styled.TouchableOpacity`
  position: absolute;
  top: 110px;
  right: 20px;
`;

export default function SearchLibraryScreen({
  navigation,
}: RootTabScreenProps<"SearchLibrary">) {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [markers, setMarkers] = useState([{}]);
  const SPACING_FOR_CARD_INSET = Layout.window.width * 0.05 - 10;

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition((pos) => {
        // Get user current location
        const { latitude, longitude } = pos.coords;
        setPosition((prev) => {
          return {
            latitude,
            longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          };
        });

        // Set example markers
        setMarkers([
          {
            id: 1,
            coordinate: {
              latitude: latitude + 0.001,
              longitude: longitude + 0.001,
            },
            title: "광진구 도서관",
            distance: "1.2",
            image: require("../assets/images/map/library_1.png"),
          },
          {
            id: 2,
            coordinate: {
              latitude: latitude + 0.002,
              longitude: longitude - 0.001,
            },
            title: "화양동 도서관",
            distance: "1.4",
            image: require("../assets/images/map/library_2.png"),
          },
          {
            id: 3,
            coordinate: {
              latitude: latitude - 0.001,
              longitude: longitude + 0.002,
            },
            title: "어린이대공원역 도서관",
            distance: "1.6",
            image: require("../assets/images/map/library_3.png"),
          },
        ]);
      });
    }, [position])
  );

  return (
    <View style={styles.container}>
      <MapViewComponent position={position} markers={markers} />
      <SearchBar
        placeholder="도서관을 입력하세요."
        searchBarStyles={{
          position: "absolute",
          top: 50,
        }}
      />
      <MyLocationButton>
        <Image
          source={require("../assets/icons/map/my-location-button.png")}
        ></Image>
      </MyLocationButton>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Layout.window.width - 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
      >
        {markers.map((marker) => {
          return (
            <View key={marker.id} style={styles.card}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode={"cover"}
              />
              <View style={styles.cardTextContainer}>
                <View style={{ height: "70%" }}>
                  <Text
                    style={{
                      height: "100%",
                      marginBottom: 20,
                      fontSize: 22,
                      fontFamily: "NotoSansKR_Medium",
                      color: colors.black,
                      overflow: "visible",
                    }}
                  >
                    {marker.title}
                  </Text>
                </View>

                <View style={styles.cardTextDistanceContainer}>
                  <Image
                    source={require("../assets/icons/map/map-card-marker.png")}
                    style={{ marginRight: 10 }}
                  ></Image>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "NotoSansKR_Medium",
                      color: colors.gray3,
                    }}
                  >
                    {marker.distance}km
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
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
