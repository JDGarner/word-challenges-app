import React from "react";
import { LargeText, AppBackground, PaddedButton } from "../../components";

const MainMenu = ({ onStartDefinitionsGame, onStartRhymesGame }) => {
  return (
    <AppBackground>
      <PaddedButton onPress={onStartDefinitionsGame}>
        <LargeText>Definitions</LargeText>
      </PaddedButton>
      <PaddedButton onPress={onStartRhymesGame}>
        <LargeText>Rhymes</LargeText>
      </PaddedButton>
    </AppBackground>
  );
};

export default MainMenu;
