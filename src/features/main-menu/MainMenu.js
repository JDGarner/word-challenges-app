import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import {
  MenuButton,
  MediumLargeText,
  MediumLargerText,
  AnimatedSequence,
  Spacer,
  ScreenContainerPadded,
  Title,
} from "../../components";
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

const MENU_ITEMS = [SCREENS.DEFINITIONS, SCREENS.RHYMES, SCREENS.SYNONYMS];

const MainMenu = ({ changeScreen }) => {
  const getMenuItems = () => {
    return MENU_ITEMS.map(item => ({
      id: item,
      component: (
        <MenuButton onPress={() => changeScreen(item)}>
          <MediumLargerText>{item}</MediumLargerText>
        </MenuButton>
      ),
    }));
  };

  return (
    <ScreenContainerPadded>
      <TopBar>
        <MediumLargeText>WORDS OF WISDOM</MediumLargeText>
        <SettingsButton>
          <Icon name="settings" size={32} color="white" />
        </SettingsButton>
      </TopBar>
      <Title text="What would you like to train?" />
      <Spacer height="8%" />
      <MenuContainer>
        <AnimatedSequence items={getMenuItems()} />
      </MenuContainer>
    </ScreenContainerPadded>
  );
};

export default MainMenu;
