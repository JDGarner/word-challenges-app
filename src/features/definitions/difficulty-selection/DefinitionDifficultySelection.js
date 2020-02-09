import React, { Fragment } from "react";
import { View } from "react-native";
import { map } from "lodash";
import styled from "styled-components";

import { LargeText, PaddedButton } from "../../../components";
import TopBar from "../TopBar";
import { DIFFICULTIES } from "../definitions-constants";
import AnimatedSequence from "../../../components/animated-sequence/AnimatedSequence";
import PopInView from "../../../components/pop-in-view/PopInView";

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

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
  margin-bottom: 30%;
  justify-content: center;
  align-items: center;
`;

const DifficultyOption = styled(PaddedButton)`
  width: 240;
  align-items: center;
  margin-vertical: 24;
`;

const DefinitionDifficultySelection = ({ onSelectDifficulty, onExitGame, navigation }) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, difficulty => {
      return (
        <DifficultyOption key={difficulty} onPress={() => onSelectDifficulty(difficulty)}>
          <LargeText>{difficulty}</LargeText>
        </DifficultyOption>
      );
    });
  };

  return (
    <Fragment>
      <TopBar onPressExitGame={() => navigation.goBack()} />
      <ContentContainer>
        <TitleContainer>
          <PopInView pointerEvents="auto" popToSize={1} duration={300} delay={50}>
            <Title>
              <LargeText>Select a Difficulty</LargeText>
            </Title>
          </PopInView>
        </TitleContainer>
        <DifficultyOptions>
          <AnimatedSequence items={getDifficultyOptions()} />
        </DifficultyOptions>
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionDifficultySelection;
