import React from "react";
import { View, Platform } from "react-native";
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
import { getSizingForOptions, ICON_SIZE } from "../../utils/sizing-utils";

const BUTTON_PADDING = getSizingForOptions(0, 0, 0, 6);
const TEXT_PADDING_TOP = getSizingForOptions(8, 8, 8, 14);

const MenuContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const ScoreTextContainer = styled(View)`
  border-top-width: 1;
  border-top-color: ${colors.textColorLight};
  width: 100%;
  padding-top: ${TEXT_PADDING_TOP};
  padding-bottom: 2;
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

  const getMenuItems = () => {
    const menuItems = [];

    menuItems.push();

    const menuItems = getMenuItemsConfig().map(({ displayName, initialScreen, score }) => {
      const isSynonyms = displayName === SCREENS.SYNONYMS;

      // Not allowed to mention 'Coming Soon' features in iOS apps
      if (isSynonyms && Platform.OS === "ios") {
        return null;
      }

      const color = isSynonyms ? colors.textColorDisabled : colors.textColor;

      const ItemFooter = isSynonyms ? (
        <ScoreTextContainer style={{ justifyContent: "center" }}>
          <SmallMediumText color={color}>Coming Soon</SmallMediumText>
        </ScoreTextContainer>
      ) : (
        <ScoreTextContainer>
          <SmallMediumText>{getRankForScore(score)}</SmallMediumText>
          <SmallMediumText>Rating: {score}</SmallMediumText>
        </ScoreTextContainer>
      );

      return {
        id: displayName,
        component: (
          <MenuButton
            onPress={() => changeScreen(initialScreen)}
            disabled={isSynonyms}
            style={{ borderColor: color }}
            verticalPadding={BUTTON_PADDING}>
            <MenuTextContainer>
              <MenuNameText color={color}>{displayName}</MenuNameText>
              {ItemFooter}
            </MenuTextContainer>
          </MenuButton>
        ),
      };
    });

    menuItems.push({
      id: "menu-options",
      component: <ConnectedMenuOptions changeScreen={changeScreen} />,
    });

    return menuItems;
  };

  // Filter out any null items (if Synonyms is not being displayed)
  const menuItems = getMenuItems().filter(i => !!i);

  return (
    <ScreenContainerPadded>
      <TopBar
        LeftComponent={<WidthSpacer width={ICON_SIZE} />}
        RightComponent={<LeaderboardButton onPress={showAllLeaderboards} />}
        displayLogo
      />
      <Title text="What would you like to train?" />
      <HeightSpacer height="5%" />
      <MenuContainer>
        <AnimatedSequence items={menuItems} />
      </MenuContainer>
    </ScreenContainerPadded>
  );
};

export default MainMenu;


