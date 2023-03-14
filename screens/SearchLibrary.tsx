import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Platform,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import MapViewComponent from "../components/Map/MapViewComponent";
import SearchBar from "../components/SearchBar/SearchBar";
import { RootTabScreenProps } from "../types";
import styled from "styled-components/native";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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
  const CARD_WIDTH = Layout.window.width - 40;

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _map = useRef<MapView>(null);
  const _scrollview = useRef<View>(null);

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollview.current.scrollTo({ x: x, y: 0, animated: true });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      // Get user current location
      const { latitude, longitude } = pos.coords;
      setPosition({
        latitude,
        longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });

      // Set example markers
      let exampleMarkers = [
        {
          id: "1",
          coordinate: {
            latitude: latitude + 0.001,
            longitude: longitude + 0.001,
          },
          title: "광진구 도서관",
          distance: "1.2",
          image: require("../assets/images/map/library_1.png"),
        },
        {
          id: "2",
          coordinate: {
            latitude: latitude + 0.002,
            longitude: longitude - 0.001,
          },
          title: "화양동 도서관",
          distance: "1.4",
          image: require("../assets/images/map/library_2.png"),
        },
        {
          id: "3",
          coordinate: {
            latitude: latitude - 0.001,
            longitude: longitude + 0.002,
          },
          title: "어린이대공원역 도서관",
          distance: "1.6",
          image: require("../assets/images/map/library_3.png"),
        },
      ];
      setMarkers([...exampleMarkers]);
    });
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={_map}
        style={styles.map}
        initialRegion={position}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        {
          // Set markers
          markers.length > 0 &&
            markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  onPress={(e) => onMarkerPress(e)}
                >
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require("../assets/icons/map/map-marker.png")}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="center"
                    />
                  </Animated.View>
                </Marker>
              );
            })
        }
      </MapView>
      <SearchBar
        placeholder="도서관을 입력하세요."
        searchBarStyles={{
          position: "absolute",
          top: 50,
        }}
      />
      <MyLocationButton
        onPress={() => {
          _map.current.animateToRegion(
            {
              ...position,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta,
            },
            350
          );
        }}
      >
        <Image
          source={require("../assets/icons/map/my-location-button.png")}
        ></Image>
      </MyLocationButton>
      <Animated.ScrollView
        ref={_scrollview}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
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
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET - 5 : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.length > 0 &&
          markers.map((marker, index) => {
            return (
              <View key={index} style={styles.card}>
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
