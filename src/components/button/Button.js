import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { TextContainer } from "..";

export const BorderedButton = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextContainer style={style}>{children}</TextContainer>
    </TouchableOpacity>
  );
};

export const PaddedButton = styled(BorderedButton)`
  padding-vertical: ${props => props.paddingVertical || 6};
  padding-horizontal: ${props => props.paddingHorizontal || 12};
`;
