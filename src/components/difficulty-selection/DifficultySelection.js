import React, { Fragment } from "react";
import { View } from "react-native";
import { map, capitalize } from "lodash";
import styled from "styled-components";

import { MediumLargerText, MenuButton, TopBar, Spacer, Title, AnimatedSequence } from "..";
import { SCREENS, DIFFICULTIES } from "../../app-constants";

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
      <TopBar onPressExitGame={() => changeScreen(SCREENS.MENU)} />
      <Title text="Select a Difficulty" />
      <Spacer height="8%" />
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DifficultySelection;
