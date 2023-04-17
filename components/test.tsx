import React, { useState, FunctionComponent, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Test: FunctionComponent = (props) => {
  useEffect(() => {
    console.log("Test component props", props.wishlistData);
  }, [props.wishlistData]);

  return (
    <View>
      <Text>{props.wishlistData.length}</Text>
    </View>
  );
};

export default Test;
