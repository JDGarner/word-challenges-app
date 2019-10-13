import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { LargeText, AppBackground, PaddedButton } from "../../components";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled(PaddedButton)`
  width: 100%;
`;

const MainMenu = ({ navigation }) => {
  return (
    <AppBackground>
      <MenuContainer>
        <MenuItem onPress={() => navigation.navigate("DefinitionGame")}>
          <LargeText>Definitions</LargeText>
        </MenuItem>
        <MenuItem onPress={() => navigation.navigate("RhymeGame")}>
          <LargeText>Rhymes</LargeText>
        </MenuItem>
      </MenuContainer>
    </AppBackground>
  );
};

MainMenu.navigationOptions = {
  header: null,
};

export default MainMenu;
