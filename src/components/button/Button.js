import React from "react";
import { TouchableHighlight } from "react-native";
import { TextContainer } from "..";

const Button = ({ children, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <TextContainer>{children}</TextContainer>
    </TouchableHighlight>
  );
};

export default Button;
