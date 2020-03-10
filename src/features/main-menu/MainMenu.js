import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import {
  MenuButton,
  MediumLargeText,
  MediumLargerText,
  PopInView,
  AnimatedSequence,
  Spacer,
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

const TitleContainer = styled(View)`
  height: 12%;
  justify-content: flex-end;
  align-items: center;
  padding-horizontal: 5%;
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
    <View style={{ flex: 1 }}>
      <TopBar>
        <MediumLargeText>WORDS OF WISDOM</MediumLargeText>
        <SettingsButton>
          <Icon name="settings" size={32} color="white" />
        </SettingsButton>
      </TopBar>
      <TitleContainer>
        <PopInView popToSize={1} duration={800} delay={20}>
          <MediumLargeText>What would you like to learn?</MediumLargeText>
        </PopInView>
      </TitleContainer>
      <Spacer height="8%" />
      <MenuContainer>
        <AnimatedSequence items={getMenuItems()} />
      </MenuContainer>
    </View>
  );
};

export default MainMenu;
