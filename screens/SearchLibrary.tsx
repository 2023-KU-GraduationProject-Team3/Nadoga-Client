import { StyleSheet, Text, View } from "react-native";

import { RootTabScreenProps } from "../types";

export default function SearchLibraryScreen({
  navigation,
}: RootTabScreenProps<"SearchLibrary">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SearchLibrary Screen</Text>
      <View
        style={styles.separator}
      />
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
});