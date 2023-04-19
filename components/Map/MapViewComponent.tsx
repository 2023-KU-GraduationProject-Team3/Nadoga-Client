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
  FunctionComponent,
} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";

import styled from "styled-components/native";
import Geolocation from "@react-native-community/geolocation";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

// constants
import Layout from "../../constants/Layout";
import { colors } from "../../constants/Colors";

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
  right: 25px;
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
import { getWithURI } from "../../apis/data4library";

// types
import { RootTabScreenProps, SearchLibraryScreenProps } from "../../types";

const SPACING_FOR_CARD_INSET = Layout.window.width * 0.05 - 10;
const CARD_WIDTH = Layout.window.width - 40;

// context
import UserContext from "../../context/userContext";
import BookContext from "../../context/bookContext";

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
  props,
}: MapViewComponentProps) => {
  const {
    user,
    setUser,
    lookingBookInfo,
    isLookingForBook,
    setIsLookingForBook,
    closestLibraryList,
    setClosestLibraryList,
    isLoanList,
    setIsLoanList,
  } = useContext(UserContext);

  // const {
  //   isLookingForBook,
  //   setIsLookingForBook,
  //   lookingBookInfo,
  //   setLookingBookInfo,
  // } = useContext(BookContext);

  const [libraryList, setLibraryList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const route = useRoute<SearchLibraryScreenProps["route"]>();
  const navigation = useNavigation<SearchLibraryScreenProps["navigation"]>();

  const [bookInfo, setBookInfo] = useState<any>(route.params?.bookInfo);

  const [markers, setMarkers] = useState([]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _map = useRef<MapView>(null);
  const _scrollview = useRef<View>(null);

  // Use the previous screen name as needed

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useFocusEffect(
    useCallback(() => {
      // 도서관 찾기 화면 올떄마다 데이터 다시 불러오기
      setMarkers([]);
      setLibraryList([]);
      // console.log("isFromDetail", isFromDetail);
      getCurrentPos();
      refetch();
      console.log("bookInfo", bookInfo);
    }, [])
  );

  const getCurrentPos = () => {
    Geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition((pos) => ({
        ...pos,
        latitude,
        longitude,
        latitudeDelta: position.latitudeDelta,
        longitudeDelta: position.longitudeDelta,
      }));

      // user position 구했으니, marker 데이터 불러오기 가능
      //refetch();
      console.log("position", position);
      _map.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: position.latitudeDelta,
          longitudeDelta: position.longitudeDelta,
        },
        350
      );
    });
  };

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

  const onMarkerPress = (mapEventData: MarkerPressEvent) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollview.current.scrollTo({ x: x, y: 0, animated: true });
    Geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({
        latitude,
        longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    if (lat1 == lat2 && lon1 == lon2) return 0;

    var radLat1 = (Math.PI * lat1) / 180;
    var radLat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radTheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
  };

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

  // API function - 1. 정보공개 도서관 조회
  const fetchLibraryData = () => {
    return getWithURI(
      `http://data4library.kr/api/libSrch?authKey=${AUTHKEY}&pageSize=1480&region=11&format=json`
    );
  };

  // API function - 11. 도서관별 도서 소장 여부 및 대출 가능여부 조회
  const getBookStatus = (libCode: number, isbn13: number) => {
    return getWithURI(
      `http://data4library.kr/api/bookExist?authKey=${AUTHKEY}&libCode=${libCode}&isbn13=${isbn13}&format=json`
    );
  };

  // GET_LIBRARY
  const { data, isLoading, refetch, isFetched, isFetching } = useQuery(
    "GET_LIBRARY",
    fetchLibraryData,
    {
      onSuccess: (data) => {
        // alert("GET_LIBRARY");
        const libArray = data.response.libs;
        // console.log("libArray: ", libArray[0]);

        let sortedMarkers: Array<Object> = [];

        // isFetched &&
        libArray.map((item: any, index: number) => {
          const distance = getDistance(
            Number(item.lib.latitude),
            Number(item.lib.longitude),
            position.latitude,
            position.longitude
          );
          // console.log(distance);
          let libObj = {
            id: item.lib.isbn13,
            libCode: item.lib.libCode,
            coordinate: {
              latitude: Number(item.lib.latitude),
              longitude: Number(item.lib.longitude),
            },
            title: item.lib.libName,
            distance: distance / 1000,
            image: require("../../assets/images/map/library_1.png"),
          };

          if (distance <= 3000 && sortedMarkers.length < 5) {
            //setMarkers((markers) => [...markers, libObj]);
            sortedMarkers.push(libObj);

            // SearchBookDetail 화면에서 온거면, 대출여부 확인해야함
            // if (isLookingForBook) {
            //   const bookStatus = getBookStatus(
            //     item.lib.libCode,
            //     lookingBookInfo.book_isbn
            //   ).then((data) => {
            //     // console.log("대출여부!");
            //     console.log(data.response.result.loanAvailable);
            //     libObj["loanAvailable"] = data.response.result.loanAvailable;
            //   });
            // }
            // 대출중, 대출가능 여부 판단

            if (sortedMarkers.length === 5) {
              sortedMarkers.sort((a, b) => {
                return a.distance - b.distance;
              });

              setClosestLibraryList(sortedMarkers);
              setMarkers([...sortedMarkers]);
            }
          }
          setLibraryList((libraryList) => [...libraryList, libObj]);
        });

        if (sortedMarkers.length > 0) {
          _map.current.animateToRegion(
            {
              ...position,
              latitude: sortedMarkers[0].coordinate.latitude,
              longitude: sortedMarkers[0].coordinate.longitude,
            },
            350
          );
        } else {
          _map.current.animateToRegion(
            {
              ...position,
            },
            350
          );
        }
      },
    }
  );

  const handleSearchLibrary = () => {
    let result1 = libraryList.filter((lib: { title: string | string[] }) => {
      return lib.title.includes(searchValue);
    });
    let searchLibraryList = [...new Set(result1)];

    if (searchLibraryList.length > 0) {
      searchLibraryList.sort((a, b) => {
        return a.distance - b.distance;
      });

      _map.current.animateToRegion(
        {
          latitude: searchLibraryList[0].coordinate.latitude,
          longitude: searchLibraryList[0].coordinate.longitude,
          latitudeDelta: position.latitudeDelta,
          longitudeDelta: position.longitudeDelta,
        },
        350
      );
      if (searchLibraryList.length > 5) {
        setMarkers([...searchLibraryList.slice(0, 5)]);
      } else {
        setMarkers([...searchLibraryList.slice(0, searchLibraryList.length)]);
      }
    } else {
      Alert.alert("알림", "검색 결과가 없습니다.");
    }
  };

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
                      source={require("../../assets/icons/map/map-marker.png")}
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
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearchLibrary}
      />
      <MyLocationButton
        onPress={() => {
          // _map.current.animateToRegion(
          //   {
          //     ...position,
          //     latitudeDelta: position.latitudeDelta,
          //     longitudeDelta: position.longitudeDelta,
          //   },
          //   350
          // );
          getCurrentPos();
        }}
      >
        <Image
          source={require("../../assets/icons/map/my-location-button.png")}
        ></Image>
      </MyLocationButton>
      <ShowClosestLibraryButton
        onPress={() => {
          setIsLookingForBook(false);
          setLibraryList([]);
          setIsLoanList([]);
          refetch();
        }}
      >
        <Image
          source={require("../../assets/icons/map/current-library.png")}
        ></Image>
      </ShowClosestLibraryButton>
      {isLookingForBook ? (
        <CurrentBookSection>
          <Text>{`현재 찾고있는 책 : ${lookingBookInfo.book_name}`}</Text>
        </CurrentBookSection>
      ) : null}
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
        {isFetching ? (
          <View
            style={{
              padding: 15,
              elevation: 2,
              backgroundColor: "#FFF",
              borderRadius: 10,
              marginHorizontal: 10,
              shadowColor: "#000",
              shadowRadius: 5,
              shadowOpacity: 0.3,
              width: Layout.window.width - 20,
              height: Layout.window.height / 5,
              overflow: "hidden",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "NotoSansKR_Medium",
                color: colors.gray3,
              }}
            >
              불러오는 중....
            </Text>
          </View>
        ) : markers.length === 0 ? (
          <View
            style={{
              padding: 15,
              elevation: 2,
              backgroundColor: "#FFF",
              borderRadius: 10,
              marginHorizontal: 10,
              shadowColor: "#000",
              shadowRadius: 5,
              shadowOpacity: 0.3,
              width: Layout.window.width - 20,
              height: Layout.window.height / 5,
              overflow: "hidden",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "NotoSansKR_Medium",
                color: colors.gray3,
              }}
            >
              검색 결과가 없습니다.
            </Text>
          </View>
        ) : (
          markers.map((marker, index) => {
            console.log("isLoan", isLoanList[index]);

            return (
              <View key={marker.libCode} style={styles.card}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={() => {
                    navigation.navigate("SearchLibraryDetail", {
                      libCode: marker.libCode,
                    });
                  }}
                >
                  <View
                    key={marker.libCode}
                    style={{
                      width: "100%",
                      height: "100%",
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
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
                            fontSize: 18,
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
                          source={require("../../assets/icons/map/map-card-marker.png")}
                          style={{ marginRight: 10 }}
                        ></Image>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "NotoSansKR_Medium",
                            color: colors.gray3,
                          }}
                        >
                          {marker.distance}km{" "}
                          {isLookingForBook && (
                            <Text
                              style={{
                                color:
                                  isLoanList?.find((lib) => {
                                    return lib.libCode === marker.libCode;
                                  })?.loanAvailable === "Y"
                                    ? colors.lightgreen
                                    : colors.red,
                              }}
                            >
                              {" "}
                              {isLookingForBook &&
                                (isLoanList?.find((lib) => {
                                  return lib.libCode === marker.libCode;
                                })?.loanAvailable === "Y"
                                  ? "대출가능"
                                  : "대출중")}
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </Animated.ScrollView>
    </View>
  );
};

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

export default MapViewComponent;
