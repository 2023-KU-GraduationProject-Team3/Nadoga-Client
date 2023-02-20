import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle, Text, Image } from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// types
import { BookProps } from "./types";

// components
const BookContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: flex-start;
	background-color: ${colors.bgGray}
  position: relative;
	width: 115px;
	height: 200px;
`;

const BookImage = styled.Image`
  width: 110px;
  height: 150px;
`;

const BookRating = styled.View`
  position: absolute;
  right: 24px;
  bottom: 60px;
  background-color: ${colors.lightgreen};
  width: 40px;
  height: 23px;
  border-radius: 13px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BookTitle = styled.Text`
  font-size: 14px;
  font-family: Poppins_Medium;
  color: ${colors.black};
`;

const BookAuthor = styled.Text`
  font-size: 12px;
  font-family: Poppins_Medium;
  color: ${colors.gray4};
`;

const BookItem: FunctionComponent<BookProps> = (props) => {
  return (
    <BookContainer>
      {/* <BookImage source={{ uri: props.book_image_url }} /> */}
      <BookImage source={require("../../assets/images/book-sample-img.png")} />
      <BookRating>
        <Text style={{ fontWeight: "700", fontSize: 12 }}>
          ★{props.book_rating}
        </Text>
      </BookRating>
      <BookTitle>{props.book_name}</BookTitle>
      <BookAuthor>- {props.book_author}</BookAuthor>
    </BookContainer>
  );
};

export default BookItem;
