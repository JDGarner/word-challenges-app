import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { LargeText, PaddedButton, MediumLargeText, MediumLargerText } from "../../components";
import { SCREENS } from "../../app-constants";
import { TEXT_TOP_PADDING } from "../../components/text/Text";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 70;
`;

const MenuItem = styled(PaddedButton)`
  width: 240;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + 10};
  padding-bottom: 10;
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

const TitleContainer = styled(View)`
  height: 20%;
  justify-content: center;
  align-items: center;
  padding-horizontal: 5%;
`;

const MainMenu = ({ changeScreen }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <MediumLargeText>WORDS OF WISDOM</MediumLargeText>
        <SettingsButton>
          <Icon name="settings" size={32} color="white" />
        </SettingsButton>
      </TopBar>
      <TitleContainer>
        <MediumLargeText textAlign="center">What would you like to learn?</MediumLargeText>
      </TitleContainer>
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
