import React, { Fragment } from "react";
import { View } from "react-native";
import { map, capitalize } from "lodash";
import styled from "styled-components";

import { SCREENS, DIFFICULTIES } from "../../app-constants";
import { FontAwesomeIconButton } from "../button/Button";
import MenuButton from "../button/MenuButton";
import { MediumLargerText } from "../text/Text";
import TopBar from "../top-bar/TopBar";
import Title from "../title/Title";
import Spacer from "../spacer/Spacer";
import AnimatedSequence from "../animated-sequence/AnimatedSequence";

const DifficultyOptions = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const DifficultySelection = ({
  titleText,
  onSelectDifficulty,
  changeScreen,
  showLeaderboard,
  leaderboardId,
}) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, difficulty => ({
      id: difficulty,
      component: (
        <MenuButton onPress={() => onSelectDifficulty(difficulty)} verticalPadding={10}>
          <MediumLargerText>{capitalize(difficulty)}</MediumLargerText>
        </MenuButton>
      ),
    }));
  };

  return (
    <Fragment>
      <TopBar
        onPressLeftButton={() => changeScreen(SCREENS.MENU)}
        titleText={titleText}
        RightComponent={
          <FontAwesomeIconButton
            name="trophy"
            size={28}
            onPress={() => showLeaderboard(leaderboardId)}
          />
        }
      />
      <Title text="Select a Difficulty" />
      <Spacer height="5%" />
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DifficultySelection;
