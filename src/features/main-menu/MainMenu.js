import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { LargeText, AppBackground, PaddedButton, MediumLargeText } from "../../components";

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

const MainMenu = ({ navigation }) => {
  return (
    <AppBackground theme="menu">
      <TopBar>
        <MediumLargeText>WORD MAESTRO</MediumLargeText>
        <SettingsButton>
          <Icon name="settings" size={32} color="white" />
        </SettingsButton>
      </TopBar>
      <MenuContainer>
        <MenuItem onPress={() => navigation.navigate("DefinitionGame")}>
          <LargeText>Definitions</LargeText>
        </MenuItem>
        <MenuItem onPress={() => navigation.navigate("RhymeGame")}>
          <LargeText>Rhymes</LargeText>
        </MenuItem>
        <MenuItem disabled>
          <LargeText>Synonyms</LargeText>
        </MenuItem>
      </MenuContainer>
    </AppBackground>
  );
};

MainMenu.navigationOptions = {
  header: null,
};

export default MainMenu;
