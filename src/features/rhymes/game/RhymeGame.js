import React, { useEffect, Fragment } from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";

import { SmallText, TextContainer, Countdown, TopBar } from "../../../components";
import AnswerText from "../../../components/answer-text/AnswerText";
import PopInView from "../../../components/pop-in-view/PopInView";
import GameHeader from "../GameHeader";
import { SCREENS } from "../../../app-constants";

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

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const RhymeGame = ({
  currentWord,
  correctAnswers,
  gameCountdown,
  animatingCountdown,
  onCountdownAnimationEnd,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  changeScreen,
}) => {
  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, []);

  return (
    <Fragment>
      <TopBar
        onPressExitGame={() => changeScreen(SCREENS.MENU)}
        gameCountdown={gameCountdown}
        animatingCountdown={animatingCountdown}
        onAnimationEnd={onCountdownAnimationEnd}
      />
      <ContentContainer>
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

        <AnswerText onSubmitAnswer={onSubmitAnswer} placeholder="Enter Rhyme" />
      </ContentContainer>
    </Fragment>
  );
};

export default RhymeGame;
