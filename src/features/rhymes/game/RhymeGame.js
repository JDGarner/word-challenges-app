import React, { useEffect, Fragment } from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";

import { SmallText, TextContainer, Countdown } from "../../../components";
import AnswerText from "../AnswerText";
import PopInView from "../../../components/pop-in-view/PopInView";
import GameHeader from "../GameHeader";

const CorrectAnswersGrid = styled(View)`
  height: 40%;
  width: 100%;
  margin-bottom: 20px;
`;

const answerGridStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
};

const CorrectAnswer = styled(SmallText)`
  text-align: center;
`;

const CorrectAnswerContainer = styled(TextContainer)`
  margin-horizontal: 10px;
  padding: 4px 2px;
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
  }, []);

  return (
    <Fragment>
      <Countdown
        gameCountdown={gameCountdown}
        animatingCountdown={animatingCountdown}
        onAnimationEnd={onCountdownAnimationEnd}
      />

      <GameHeader word={currentWord} />

      <CorrectAnswersGrid>
        <ScrollView contentContainerStyle={answerGridStyle}>
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
        </ScrollView>
      </CorrectAnswersGrid>

      <AnswerText currentRhymes={currentRhymes} onSubmitAnswer={onSubmitAnswer} />
    </Fragment>
  );
};

export default RhymeGame;
