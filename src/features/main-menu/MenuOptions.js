import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import AnimatedButton from "../../components/button/AnimatedButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SoundManager from "../sound/SoundManager";
import colors from "../../theme/colors";
import { SCREENS } from "../../app-constants";
import { getSizingForOptions } from "../../utils/sizing-utils";

const MENU_OPTIONS_SPACING = getSizingForOptions("10%", "36%", "60%");
const MENU_OPTION_BUTTON = getSizingForOptions(48, 50, 52);
const ICON_SIZE = getSizingForOptions(28, 30, 32);

const MenuOptionsContainer = styled(View)`
  margin-top: ${MENU_OPTIONS_SPACING};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MenuOptionButton = styled(AnimatedButton)`
  height: ${MENU_OPTION_BUTTON};
  width: ${MENU_OPTION_BUTTON};
  margin-horizontal: 10;
  align-items: center;
  justify-content: center;
`;

const VolumeOff = <Icon name="volume-off" size={ICON_SIZE} color={colors.textColor} />;
const VolumeOn = <Icon name="volume-up" size={ICON_SIZE} color={colors.textColor} />;

const MenuOptions = ({ changeScreen, muted }) => {
  const onPressToggleMute = () => {
    SoundManager.getInstance().toggleMute();
  };

  const onPressInfoButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    changeScreen(SCREENS.INFO);
  };

  const VolumeIcon = muted ? VolumeOff : VolumeOn;

  return (
    <MenuOptionsContainer>
      <MenuOptionButton onPress={onPressToggleMute}>{VolumeIcon}</MenuOptionButton>
      <MenuOptionButton onPress={onPressInfoButton}>
        <CommunityIcon name="information-variant" size={ICON_SIZE} color={colors.textColor} />
      </MenuOptionButton>
    </MenuOptionsContainer>
  );
};

export default MenuOptions;
