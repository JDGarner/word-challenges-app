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
import { SettingsButton, LeaderboardButton } from "../../components/button/Button";
import { SmallMediumText } from "../../components/text/Text";
import colors from "../../theme/colors";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const ScoreTextContainer = styled(View)`
  border-top-width: 1;
  border-top-color: ${colors.textColorLight};
  width: 100%;
  padding-top: 6;
  align-items: flex-start;
`;

const MenuNameText = styled(MediumLargerText)`
  padding-top: 2;
  padding-bottom: 4;
`;

const MenuTextContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-vertical: 6;
`;

const MainMenu = ({ changeScreen, showAllLeaderboards, definitionsELO, rhymesELO }) => {
  const getMenuItemsConfig = () => {
    return [
      {
        displayName: SCREENS.DEFINITIONS,
        initialScreen: SCREENS.DEFINITIONS_DIFFICULTY,
        score: definitionsELO,
      },
      {
        displayName: SCREENS.RHYMES,
        initialScreen: SCREENS.RHYMES_DIFFICULTY,
        score: rhymesELO,
      },
      { displayName: SCREENS.SYNONYMS, initialScreen: SCREENS.SYNONYMS_DIFFICULTY, score: 800 },
    ];
  };

  const getMenuItems = () => {
    return getMenuItemsConfig().map(({ displayName, initialScreen, score }) => ({
      id: displayName,
      component: (
        <MenuButton onPress={() => changeScreen(initialScreen)}>
          <MenuTextContainer>
            <MenuNameText>{displayName}</MenuNameText>
            <ScoreTextContainer>
              <SmallMediumText>Rating: {score}</SmallMediumText>
            </ScoreTextContainer>
          </MenuTextContainer>
        </MenuButton>
      ),
    }));
  };

  return (
    <ScreenContainerPadded>
      <TopBar
        LeftComponent={<SettingsButton onPress={() => changeScreen(SCREENS.SETTINGS)} />}
        titleText="WORD MONKEY"
        RightComponent={<LeaderboardButton onPress={showAllLeaderboards} />}
      />
      <Title text="What would you like to train?" />
      <Spacer height="5%" />
      <MenuContainer>
        <AnimatedSequence items={getMenuItems()} />
      </MenuContainer>
    </ScreenContainerPadded>
  );
};

export default MainMenu;
