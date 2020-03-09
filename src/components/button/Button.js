import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import theme from "../../theme";
import { TextContainer } from "../containers/Containers";
import { TEXT_TOP_PADDING } from "../text/Text";

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

export const BackButton = buttonProps => {
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon name="arrow-back" size={36} color={theme.textColor} />
    </TouchableOpacity>
  );
};

export const MenuButton = styled(PaddedButton)`
  width: 240;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + 10};
  padding-bottom: 10;
  margin-vertical: 24;
`;
