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

const MenuOptionsContainer = styled(View)`
  margin-top: ${MENU_OPTIONS_SPACING};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MenuOptionButton = styled(AnimatedButton)`
  height: 52;
  width: 52;
  margin-horizontal: 10;
  align-items: center;
  justify-content: center;
`;

const VolumeOff = <Icon name="volume-off" size={32} color={colors.textColor} />;
const VolumeOn = <Icon name="volume-up" size={32} color={colors.textColor} />;

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
        <CommunityIcon name="information-variant" size={32} color={colors.textColor} />
      </MenuOptionButton>
    </MenuOptionsContainer>
  );
};

export default MenuOptions;
