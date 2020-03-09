import React, { Fragment } from "react";
import { View } from "react-native";
import { map } from "lodash";
import styled from "styled-components";

import { MediumLargeText, MediumLargerText, MenuButton } from "../../../components";
import TopBar from "../TopBar";
import { DIFFICULTIES } from "../definitions-constants";
import AnimatedSequence from "../../../components/animated-sequence/AnimatedSequence";
import PopInView from "../../../components/pop-in-view/PopInView";
import { SCREENS } from "../../../app-constants";

const TitleContainer = styled(View)`
  height: 20%;
  justify-content: center;
  align-items: center;
`;

const Title = styled(View)`
  justify-content: center;
  align-items: center;
`;

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
      <TitleContainer>
        <PopInView pointerEvents="auto" popToSize={1} duration={800} delay={20}>
          <Title>
            <MediumLargeText>Select a Difficulty</MediumLargeText>
          </Title>
        </PopInView>
      </TitleContainer>
      <DifficultyOptions>
        <AnimatedSequence items={getDifficultyOptions()} />
      </DifficultyOptions>
    </Fragment>
  );
};

export default DefinitionDifficultySelection;
