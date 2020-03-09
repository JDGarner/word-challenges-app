import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { MenuButton, MediumLargeText, MediumLargerText } from "../../components";
import { SCREENS } from "../../app-constants";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
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
        <MenuButton onPress={() => changeScreen(SCREENS.DEFINITIONS)}>
          <MediumLargerText>Definitions</MediumLargerText>
        </MenuButton>
        <MenuButton onPress={() => changeScreen(SCREENS.RHYMES)}>
          <MediumLargerText>Rhymes</MediumLargerText>
        </MenuButton>
        <MenuButton disabled>
          <MediumLargerText>Synonyms</MediumLargerText>
        </MenuButton>
      </MenuContainer>
    </View>
  );
};

export default MainMenu;
