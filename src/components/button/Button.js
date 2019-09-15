import React from "react";
import { TouchableHighlight } from "react-native";
import { TextContainer } from "..";

const Button = ({ children, style, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <TextContainer style={style}>{children}</TextContainer>
    </TouchableHighlight>
  );
};

export default Button;
