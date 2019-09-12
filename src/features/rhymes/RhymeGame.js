import React, { useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";

import {
  LargeText,
  MediumText,
  SmallText,
  CenteredContainer,
  HideKeyboardOnTouch,
  TextContainer,
} from "../../components";
import AnswerText from "./AnswerText";
import PopInView from "../../components/pop-in-view/PopInView";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
  justify-content: space-around;
`;

const CorrectAnswersGrid = styled(CenteredContainer)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  /* border-width: 1;
  border-color: red; */
`;

const CorrectAnswer = styled(SmallText)`
  text-align: center;
`;

const CorrectAnswerContainer = styled(TextContainer)`
  margin-horizontal: 10px;
  padding: 4px 2px;
`;

const CurrentWordContainer = styled(TextContainer)`
  margin-bottom: 20px;
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
`;

const GridItem = styled(View)`
  width: 33.33333333%;
  margin-bottom: 10px;
`;

const CountdownText = styled(LargeText)`
  position: absolute;
  top: 50px;
  right: 25px;
  color: rgba(255, 255, 255, 0.4);
`;

const RhymeGame = ({
  currentWord,
  currentRhymes,
  correctAnswers,
  gameCountdown,
  onBeginGame,
  onSubmitAnswer,
}) => {
  useEffect(() => {
    onBeginGame();
  }, [onBeginGame]);

  return (
    <HideKeyboardOnTouch>
      <ScreenContainer>
        <CountdownText>{gameCountdown}</CountdownText>

        <CurrentWordContainer>
          <LargeText>{capitalize(currentWord)}</LargeText>
        </CurrentWordContainer>

        <CorrectAnswersGrid>
          {correctAnswers.map(answer => {
            return (
              <GridItem key={answer}>
                <PopInView>
                  <CorrectAnswerContainer>
                    <CorrectAnswer>{answer}</CorrectAnswer>
                  </CorrectAnswerContainer>
                </PopInView>
              </GridItem>
            );
          })}
        </CorrectAnswersGrid>

        <AnswerText currentRhymes={currentRhymes} onSubmitAnswer={onSubmitAnswer} />
      </ScreenContainer>
    </HideKeyboardOnTouch>
  );
};

export default RhymeGame;
