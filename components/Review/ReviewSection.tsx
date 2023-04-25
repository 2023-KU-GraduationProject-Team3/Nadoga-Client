import React, { useState, useEffect, FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components/native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// components
import ReviewItem from "./ReviewItem";
const ReviewListContainer = styled.View`
  width: ${layout.window.width}px;
  background-color: ${colors.bgGray};
  padding-top: 20px;
  flex: 1;
  padding-horizontal: 20px;
`;

const ReviewList = styled.FlatList``;

// types
import { ReviewSectionProps } from "./types";

const ReviewSection: FunctionComponent<ReviewSectionProps> = (props) => {
  return (
    <ReviewListContainer>
      <ReviewList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bgGray,
        }}
        data={props.reviews}
        numColumns={1}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }: any) => id}
        renderItem={({ item }: any) => <ReviewItem {...item} />}
      ></ReviewList>
    </ReviewListContainer>
  );
};

export default ReviewSection;
