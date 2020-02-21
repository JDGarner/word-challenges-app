import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { LargeText, AppBackground, PaddedButton } from "../../components";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const MenuItems = styled(View)`
  flex: 1;
  width: 100%;
  margin-bottom: 30%;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled(PaddedButton)`
  width: 240;
  align-items: center;
  margin-vertical: 24;
`;

const Title = styled(View)`
  height: 30%;
  justify-content: flex-end;
  align-items: center;
`;

const MainMenu = ({ navigation }) => {
  return (
    <AppBackground theme="menu">
      <MenuContainer>
        <Title>
          <LargeText>Word Ninja</LargeText>
        </Title>
        <MenuItems>
          <MenuItem onPress={() => navigation.navigate("DefinitionGame")}>
            <LargeText>Definitions</LargeText>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("RhymeGame")}>
            <LargeText>Rhymes</LargeText>
          </MenuItem>
        </MenuItems>
      </MenuContainer>
    </AppBackground>
  );
};

MainMenu.navigationOptions = {
  header: null,
};

export default MainMenu;
