import React, { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, Animated } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import theme from "../../theme";
import { TextContainer } from "../containers/Containers";
import SoundManager from "../../features/sound/SoundManager";
import { animateButtonPressIn, animateButtonPressOut } from "./button-utils";

export const BorderedButton = ({ children, style, reduceScaleFactor = 0.95, ...buttonProps }) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const textContainerStyle = [...style];

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableWithoutFeedback
        onPressIn={() => animateButtonPressIn(scaleValue, reduceScaleFactor)}
        onPressOut={() => animateButtonPressOut(scaleValue)}
        {...buttonProps}>
        <TextContainer style={textContainerStyle}>{children}</TextContainer>
      </TouchableWithoutFeedback>
    </Animated.View>
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

export const LeaderboardButton = ({ onPress }) => {
  const onPressLeaderboardButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    onPress();
  };

  return <FontAwesomeIconButton name="trophy" size={28} onPress={onPressLeaderboardButton} />;
};

export const SettingsButton = ({ onPress }) => {
  const onPressSettingsButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    onPress();
  };

  return <IconButton name="settings" size={28} onPress={onPressSettingsButton} />;
};
