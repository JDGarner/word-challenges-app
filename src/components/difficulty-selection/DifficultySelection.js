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
import { HeightSpacer } from "../spacer/Spacer";
import AnimatedSequence from "../animated-sequence/AnimatedSequence";
import { getSizingForOptions } from "../../utils/sizing-utils";

const OPTION_WIDTH = getSizingForOptions(180, 210, 230, 370);
const OPTION_PADDING = getSizingForOptions(10, 12, 14, 24);
const VERTICAL_SPACING = getSizingForOptions("5%", "5%", "6%", "5%");

const DifficultyOptions = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const DifficultySelection = ({ titleText, onSelectDifficulty, showLeaderboard, mode }) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, (difficulty) => ({
      id: difficulty,
      component: (
        <MenuButton
          onPress={() => onSelectDifficulty(difficulty)}
          testID={`difficulty-button-${difficulty}`}
          width={OPTION_WIDTH}
          verticalPadding={OPTION_PADDING}
          verticalSpacing={VERTICAL_SPACING}>
          <MediumLargerText>{capitalize(difficulty)}</MediumLargerText>
        </MenuButton>
      ),
    }));
  };

  return (
    <Fragment>
      <ConnectedTopBar
        titleText={titleText}
        RightComponent={<LeaderboardButton onPress={() => showLeaderboard(mode)} />}
      />
      <Title text="Select a difficulty" />
      <HeightSpacer height="5%" />
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DifficultySelection;
