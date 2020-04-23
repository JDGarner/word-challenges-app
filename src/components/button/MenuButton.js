import React from "react";
import styled from "styled-components";
import SoundManager from "../../features/sound/SoundManager";
import { TEXT_TOP_PADDING } from "../text/Text";
import AnimatedButton from "./AnimatedButton";

const MenuPaddedButton = styled(AnimatedButton)`
  width: 260;
  align-items: center;
  padding-top: ${({ verticalPadding }) =>
    verticalPadding ? TEXT_TOP_PADDING + verticalPadding : TEXT_TOP_PADDING};
  padding-bottom: ${props => props.verticalPadding || 0};
  padding-horizontal: 12;
  margin-vertical: 6%;
`;

const MenuButton = ({ onPress, ...otherProps }) => {
  const onPressMenuButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    onPress();
  };

  return <MenuPaddedButton onPress={onPressMenuButton} {...otherProps} />;
};

export default MenuButton;
