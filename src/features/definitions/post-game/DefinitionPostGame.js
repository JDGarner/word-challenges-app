import React, { Fragment } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { LargeText, PaddedButton, MediumLargeText } from "../../../components";
import TopBar from "../TopBar";
import Answer from "./Answer";
import {
  ANSWER_ANIMATION_GAP_TIME,
  WORDS_PER_ROUND,
  ANSWER_ANIMATION_START_DELAY_TIME,
  ANSWER_ANIMATION_DURATION,
} from "../definitions-constants";
import PopInView from "../../../components/pop-in-view/PopInView";

const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 8%;
`;

const ScoreContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 45;
`;

const AnswerContainer = styled(View)`
  width: 100%;
  margin-top: 30;
  margin-bottom: 30;
`;

const PlayAgain = styled(View)``;

const DefinitionPostGame = ({
  onPressStartNewGame,
  onExitGame,
  currentDefinitions,
  navigation,
}) => {
  const onPressExitGame = () => {
    navigation.goBack();
    setTimeout(() => {
      onExitGame();
    }, 500);
  };

  const score = currentDefinitions.filter(d => d.isCorrect).length;
  const totalAnimationTime =
    ANSWER_ANIMATION_START_DELAY_TIME +
    WORDS_PER_ROUND * ANSWER_ANIMATION_GAP_TIME +
    ANSWER_ANIMATION_DURATION;

  return (
    <Fragment>
      <TopBar
        onPressExitGame={onPressExitGame}
        animateDuration={500}
        animateDelay={totalAnimationTime}
      />
      <ContentContainer>
        <PopInView popToSize={1} duration={ANSWER_ANIMATION_START_DELAY_TIME} delay={150}>
          <MediumLargeText>Not Bad!</MediumLargeText>
        </PopInView>
        <AnswerContainer>
          {currentDefinitions.map((def, i) => (
            <Answer
              key={def._id}
              delay={i * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME}
              {...def}
            />
          ))}
        </AnswerContainer>
        <ScoreContainer>
          <PopInView popToSize={1} duration={220} delay={totalAnimationTime}>
            <LargeText>{score}</LargeText>
          </PopInView>
          <PopInView popToSize={1} duration={220} delay={totalAnimationTime + 60}>
            <LargeText> / </LargeText>
          </PopInView>
          <PopInView popToSize={1} duration={220} delay={totalAnimationTime + 120}>
            <LargeText>{WORDS_PER_ROUND}</LargeText>
          </PopInView>
        </ScoreContainer>
        <PlayAgain>
          <PopInView
            pointerEvents="auto"
            popToSize={1}
            duration={1500}
            delay={totalAnimationTime + 350}>
            <PaddedButton onPress={onPressStartNewGame}>
              <LargeText>Play Again</LargeText>
            </PaddedButton>
          </PopInView>
        </PlayAgain>
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionPostGame;
