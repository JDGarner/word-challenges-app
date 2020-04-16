import React, { Fragment } from "react";
import { View } from "react-native";
import { map, capitalize } from "lodash";
import styled from "styled-components";

import { DIFFICULTIES } from "../../app-constants";
import { LeaderboardButton } from "../button/Button";
import MenuButton from "../button/MenuButton";
import { MediumLargerText } from "../text/Text";
import ConnectedTopBar from "../top-bar/ConnectedTopBar";
import Title from "../title/Title";
import Spacer from "../spacer/Spacer";
import AnimatedSequence from "../animated-sequence/AnimatedSequence";

const DifficultyOptions = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const DifficultySelection = ({ titleText, onSelectDifficulty, showLeaderboard, leaderboardId }) => {
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
      <ConnectedTopBar
        titleText={titleText}
        RightComponent={<LeaderboardButton onPress={() => showLeaderboard(leaderboardId)} />}
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
