import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { LargeText, PaddedButton, MediumLargeText } from "../../components";
import { SCREENS } from "../../app-constants";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 70;
`;

const MenuItem = styled(PaddedButton)`
  width: 240;
  align-items: center;
  margin-vertical: 24;
`;

const SettingsButton = styled(TouchableOpacity)`
  position: absolute;
  right: 5%;
`;

const TopBar = styled(View)`
  height: 70;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;

const MainMenu = ({ changeScreen }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <MediumLargeText>WORD MAESTRO</MediumLargeText>
        <SettingsButton>
          <Icon name="settings" size={32} color="white" />
        </SettingsButton>
      </TopBar>
      <MenuContainer>
        <MenuItem onPress={() => changeScreen(SCREENS.DEFINITIONS)}>
          <LargeText>Definitions</LargeText>
        </MenuItem>
        <MenuItem onPress={() => changeScreen(SCREENS.RHYMES)}>
          <LargeText>Rhymes</LargeText>
        </MenuItem>
        <MenuItem disabled>
          <LargeText>Synonyms</LargeText>
        </MenuItem>
      </MenuContainer>
    </View>
  );
};

export default MainMenu;
