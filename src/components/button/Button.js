import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import theme from "../../theme";
import { TextContainer } from "../containers/Containers";
import { TEXT_TOP_PADDING, MediumLargeText } from "../text/Text";
import PopInView from "../pop-in-view/PopInView";

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

export const IconButton = ({ name, size = 36, ...buttonProps }) => {
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon name={name} size={size} color={theme.textColor} />
    </TouchableOpacity>
  );
};

export const FontAwesomeIconButton = ({ name, size = 36, ...buttonProps }) => {
  return (
    <TouchableOpacity {...buttonProps}>
      <FontAwesomeIcon name={name} size={size} color={theme.textColor} />
    </TouchableOpacity>
  );
};

export const MenuButton = styled(PaddedButton)`
  width: 230;
  align-items: center;
  padding-top: ${({ verticalPadding }) =>
    verticalPadding ? TEXT_TOP_PADDING + verticalPadding : TEXT_TOP_PADDING};
  padding-bottom: ${props => props.verticalPadding || 0};
  margin-vertical: 6%;
`;

export const PlayAgainButton = ({ disabled, animateDelay, onPress, onAnimationStart }) => {
  return (
    <PopInView
      pointerEvents="auto"
      popToSize={1}
      duration={1300}
      delay={animateDelay}
      onAnimationStart={onAnimationStart}>
      <PaddedButton
        onPress={onPress}
        disabled={disabled}
        paddingVertical={10}
        paddingHorizontal={24}>
        <MediumLargeText>Play Again</MediumLargeText>
      </PaddedButton>
    </PopInView>
  );
};
