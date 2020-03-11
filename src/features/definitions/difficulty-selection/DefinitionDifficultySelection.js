import React, { Fragment } from "react";
import { View } from "react-native";
import { map } from "lodash";
import styled from "styled-components";

import { MediumLargerText, MenuButton, TopBar, Spacer, Title } from "../../../components";
import { DIFFICULTIES } from "../definitions-constants";
import AnimatedSequence from "../../../components/animated-sequence/AnimatedSequence";
import { SCREENS } from "../../../app-constants";

const DifficultyOptions = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const DefinitionDifficultySelection = ({ onSelectDifficulty, changeScreen }) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, difficulty => ({
      id: difficulty,
      component: (
        <MenuButton onPress={() => onSelectDifficulty(difficulty)}>
          <MediumLargerText>{difficulty}</MediumLargerText>
        </MenuButton>
      ),
    }));
  };

  return (
    <Fragment>
      <TopBar onPressExitGame={() => changeScreen(SCREENS.MENU)} />
      <Title text="Select a Difficulty" />
      <Spacer height="8%" />
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DefinitionDifficultySelection;
