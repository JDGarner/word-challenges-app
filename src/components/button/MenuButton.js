import React from "react";
import styled from "styled-components";
import SoundManager from "../../features/sound/SoundManager";
import { TEXT_TOP_PADDING } from "../text/Text";
import AnimatedButton from "./AnimatedButton";
import { getSizingForOptions } from "../../utils/sizing-utils";

const MENU_BUTTON_SPACING = getSizingForOptions("3%", "4%", "6%", "5%");
const MENU_BUTTON_WIDTH = getSizingForOptions(200, 220, 240, 380);

const MenuPaddedButton = styled(AnimatedButton)`
  width: ${props => props.width || MENU_BUTTON_WIDTH};
  align-items: center;
  padding-top: ${({ verticalPadding }) =>
    verticalPadding ? TEXT_TOP_PADDING + verticalPadding : TEXT_TOP_PADDING};
  padding-bottom: ${props => props.verticalPadding || 0};
  padding-horizontal: 12;
  margin-vertical: ${MENU_BUTTON_SPACING};
`;

const MenuButton = ({ onPress, ...otherProps }) => {
  const onPressMenuButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    onPress();
  };

  return <MenuPaddedButton onPress={onPressMenuButton} {...otherProps} />;
};

export default MenuButton;
