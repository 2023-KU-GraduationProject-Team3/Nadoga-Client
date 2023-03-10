import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { RootTabScreenProps } from "../types";
import { PROVIDER_GOOGLE } from "react-native-maps";

export default function SearchLibraryScreen({
  navigation,
}: RootTabScreenProps<"SearchLibrary">) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
      <Text>Map for SearchLibrary Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
