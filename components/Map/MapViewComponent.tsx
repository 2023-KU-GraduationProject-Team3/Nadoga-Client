import React, { useState, useEffect, FunctionComponent, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "react-native-paper";
import Geolocation from "@react-native-community/geolocation";
import { SearchBar } from "react-native-screens";

// types
type position = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type MapViewComponentProps = {
  position: position;
  markers: Array<object>;
};

const MapViewComponent: FunctionComponent = ({
  position,
  markers,
}: MapViewComponentProps) => {
  const _map = useRef(null);
  const _scrollview = useRef(null);

  return (
    <MapView
      ref={_map}
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
      mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {
        // Set markers
        markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.distance + "km"}
            >
              <Animated.View style={styles.markerWrap}>
                <Animated.Image
                  source={require("../../assets/icons/map/map-marker.png")}
                  style={styles.marker}
                  resizeMode="center"
                />
              </Animated.View>
            </Marker>
          );
        })
      }
    </MapView>
  );
};

const styles = StyleSheet.create({
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
});

export default MapViewComponent;
