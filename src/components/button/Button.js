import React from "react";
import styled from "styled-components";
import { TouchableHighlight } from "react-native";
import { TextContainer } from "..";

export const Button = ({ children, style, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <TextContainer style={style}>{children}</TextContainer>
    </TouchableHighlight>
  );
};

export const PaddedButton = styled(Button)`
  padding-vertical: 6;
  padding-horizontal: 12;
`;
