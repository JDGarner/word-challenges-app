import React, { useState } from "react";
import styled from "styled-components";
import { View } from "react-native";
import AnimatedButton from "../../components/button/AnimatedButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SoundManager from "../sound/SoundManager";
import colors from "../../theme/colors";
import { SCREENS } from "../../app-constants";

const MenuOptionsContainer = styled(View)`
  margin-top: 60%;
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

const MenuOptions = ({ changeScreen, muted }) => {
  const onPressToggleMute = () => {
    SoundManager.getInstance().toggleMute();
  };

  const iconName = muted ? "volume-off" : "volume-up";

  return (
    <MenuOptionsContainer>
      <MenuOptionButton onPress={onPressToggleMute}>
        <Icon name={iconName} size={32} color={colors.textColor} />
      </MenuOptionButton>
      <MenuOptionButton onPress={() => changeScreen(SCREENS.INFO)}>
        <CommunityIcon name="information-variant" size={32} color={colors.textColor} />
      </MenuOptionButton>
    </MenuOptionsContainer>
  );
};

export default MenuOptions;
