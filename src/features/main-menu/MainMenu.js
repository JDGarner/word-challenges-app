import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import {
  MenuButton,
  GameTitle,
  MediumLargerText,
  AnimatedSequence,
  Spacer,
  ScreenContainerPadded,
  Title,
  TopBar,
} from "../../components";
import { SCREENS } from "../../app-constants";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
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
      <TopBar
        MiddleComponent={<GameTitle>WORDS OF WISDOM</GameTitle>}
        RightComponent={
          <TouchableOpacity onPress={() => changeScreen(SCREENS.SETTINGS)}>
            <Icon name="settings" size={28} color="white" />
          </TouchableOpacity>
        }
      />
      <Title text="What would you like to train?" />
      <Spacer height="8%" />
      <MenuContainer>
        <AnimatedSequence items={getMenuItems()} />
      </MenuContainer>
    </ScreenContainerPadded>
  );
};

export default MainMenu;
