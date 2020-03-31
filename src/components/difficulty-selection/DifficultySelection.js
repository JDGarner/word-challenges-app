import React, { Fragment } from "react";
import { View } from "react-native";
import { map, capitalize } from "lodash";
import styled from "styled-components";

import { SCREENS, DIFFICULTIES } from "../../app-constants";
import { MenuButton } from "../button/Button";
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

const DifficultySelection = ({ onSelectDifficulty, changeScreen }) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, difficulty => ({
      id: difficulty,
      component: (
        <MenuButton onPress={() => onSelectDifficulty(difficulty)}>
          <MediumLargerText>{capitalize(difficulty)}</MediumLargerText>
        </MenuButton>
      ),
    }));
  };

  return (
    <Fragment>
      <TopBar onPressLeftButton={() => changeScreen(SCREENS.MENU)} />
      <Title text="Select a Difficulty" />
      <Spacer height="8%" />
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DifficultySelection;
