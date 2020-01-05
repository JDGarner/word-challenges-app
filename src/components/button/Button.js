import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import { TextContainer } from "..";
import theme from "../../theme";

export const BorderedButton = ({ children, style, ...buttonProps }) => {
  return (
    <TouchableOpacity {...buttonProps}>
      <TextContainer style={style}>{children}</TextContainer>
    </TouchableOpacity>
  );
};

export const PaddedButton = styled(BorderedButton)`
  padding-vertical: ${props => props.paddingVertical || 6};
  padding-horizontal: ${props => props.paddingHorizontal || 12};
`;

export const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="close" size={38} color={theme.textColor} />
    </TouchableOpacity>
  );
};
