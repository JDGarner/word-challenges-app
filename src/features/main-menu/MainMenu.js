import React from "react";
import { View } from "react-native";
import { capitalize } from "lodash";
import styled from "styled-components";
import {
  MenuButton,
  MediumLargerText,
  AnimatedSequence,
  HeightSpacer,
  WidthSpacer,
  ScreenContainerPadded,
  Title,
  TopBar,
} from "../../components";
import { SCREENS } from "../../app-constants";
import { LeaderboardButton } from "../../components/button/Button";
import { SmallMediumText } from "../../components/text/Text";
import colors from "../../theme/colors";
import { getRankForScore } from "../../utils/elo-utils";
import ConnectedMenuOptions from "./ConnectedMenuOptions";

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const ScoreTextContainer = styled(View)`
  border-top-width: 1;
  border-top-color: ${colors.textColorLight};
  width: 100%;
  padding-top: 8;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
`;

const MenuNameText = styled(MediumLargerText)`
  padding-top: 2;
  padding-bottom: 7;
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
    const menuItems = getMenuItemsConfig().map(({ displayName, initialScreen, score }) => ({
      id: displayName,
      component: (
        <MenuButton onPress={() => changeScreen(initialScreen)}>
          <MenuTextContainer>
            <MenuNameText>{displayName}</MenuNameText>
            <ScoreTextContainer>
              <SmallMediumText>Rating: {score}</SmallMediumText>
              <SmallMediumText>Rank: {capitalize(getRankForScore(score))}</SmallMediumText>
            </ScoreTextContainer>
          </MenuTextContainer>
        </MenuButton>
      ),
    }));

    menuItems.push({
      id: "menu-options",
      component: <ConnectedMenuOptions changeScreen={changeScreen} />,
    });

    return menuItems;
  };

  return (
    <ScreenContainerPadded>
      <TopBar
        LeftComponent={<WidthSpacer width={36.5} />}
        RightComponent={<LeaderboardButton onPress={showAllLeaderboards} />}
        displayLogo
      />
      <Title text="What would you like to train?" />
      <HeightSpacer height="5%" />
      <MenuContainer>
        <AnimatedSequence items={getMenuItems()} />
      </MenuContainer>
    </ScreenContainerPadded>
  );
};

export default MainMenu;
