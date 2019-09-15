import React, { useEffect, Fragment } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";

import {
  LargeText,
  SmallText,
  CenteredContainer,
  TextContainer,
  Countdown,
} from "../../../components";
import AnswerText from "../AnswerText";
import PopInView from "../../../components/pop-in-view/PopInView";

const CorrectAnswersGrid = styled(CenteredContainer)`
  height: 42%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const CorrectAnswer = styled(SmallText)`
  text-align: center;
`;

const CorrectAnswerContainer = styled(TextContainer)`
  margin-horizontal: 10px;
  padding: 4px 2px;
`;

const CurrentWordContainer = styled(TextContainer)`
  margin-top: 150px;
  margin-bottom: 40px;
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
`;

const GridItem = styled(View)`
  width: 33.33333333%;
  margin-bottom: 10px;
`;

const RhymeGame = ({
  currentWord,
  currentRhymes,
  correctAnswers,
  gameCountdown,
  animatingCountdown,
  onCountdownAnimationEnd,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
}) => {
  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, [onBeginGame, onGameEnd]);

  return (
    <Fragment>
      {/* <CountdownText>{gameCountdown}</CountdownText> */}
      <Countdown
        gameCountdown={gameCountdown}
        animatingCountdown={animatingCountdown}
        onAnimationEnd={onCountdownAnimationEnd}
      />

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
    </Fragment>
  );
};

export default RhymeGame;
