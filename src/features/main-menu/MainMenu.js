import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import {
  MenuButton,
  MediumLargerText,
  AnimatedSequence,
  Spacer,
  ScreenContainerPadded,
  Title,
  TopBar,
} from "../../components";
import { SCREENS } from "../../app-constants";
import { IconButton, FontAwesomeIconButton } from "../../components/button/Button";

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
        LeftComponent={<FontAwesomeIconButton name="trophy" size={28} onPress={() => {}} />}
        titleText="WORDS OF WISDOM"
        RightComponent={
          <IconButton name="settings" size={28} onPress={() => changeScreen(SCREENS.SETTINGS)} />
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
