import React, { Fragment } from "react";
import { View } from "react-native";
import { map } from "lodash";
import styled from "styled-components";

import { PaddedButton, MediumText, MediumLargeText, MediumLargerText } from "../../../components";
import TopBar from "../TopBar";
import { DIFFICULTIES, DIFFICULTY_TO_INFO_MAP } from "../definitions-constants";
import AnimatedSequence from "../../../components/animated-sequence/AnimatedSequence";
import PopInView from "../../../components/pop-in-view/PopInView";

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: center;
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
  justify-content: flex-start;
  align-items: center;
`;

const DifficultyOption = styled(PaddedButton)`
  width: 180;
  align-items: center;
  margin-vertical: 18;
`;

const DefinitionDifficultySelection = ({ onSelectDifficulty, onExitGame, navigation }) => {
  const getDifficultyOptions = () => {
    return map(DIFFICULTIES, difficulty => ({
      id: difficulty,
      component: (
        <DifficultyOption onPress={() => onSelectDifficulty(difficulty)}>
          <MediumLargeText>{difficulty}</MediumLargeText>
          {/* <View>
            <MediumLargeText>{difficulty}</MediumLargeText>
            <MediumText>{DIFFICULTY_TO_INFO_MAP[difficulty]}</MediumText>
          </View> */}
        </DifficultyOption>
      ),
    }));
  };

  return (
    <Fragment>
      <TopBar onPressExitGame={() => navigation.goBack()} />
      <ContentContainer>
        <TitleContainer>
          <PopInView pointerEvents="auto" popToSize={1} duration={300} delay={50}>
            <Title>
              <MediumLargerText>Select a Difficulty</MediumLargerText>
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
