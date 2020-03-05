import React, { Fragment, useRef, useState } from "react";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
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
import { getPraiseForScore } from "../definitions-utils";
import { SCREENS } from "../../../app-constants";

const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const FeedbackTextContainer = styled(View)`
  flex: 0.4;
  align-items: center;
  justify-content: center;
`;

const ScrollViewContainer = styled(View)`
  max-height: 70%;
  width: 100%;
`;

const AnswersScrollView = styled(ScrollView)`
  width: 100%;
  margin-vertical: 16;
`;

const Footer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 32;
`;

const ScoreContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 12;
`;

const PlayAgain = styled(View)`
  margin-top: 12;
`;

const DefinitionPostGame = ({
  onPressStartNewGame,
  onExitGame,
  currentDefinitions,
  changeScreen,
}) => {
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [userActionsDisabled, setUserActionsDisabled] = useState(true);
  const scrollViewRef = useRef();

  const onPlayAgainAnimationStart = () => {
    setUserActionsDisabled(false);
    setShowScrollBar(true);
    if (scrollViewRef && scrollViewRef.current && scrollViewRef.current.flashScrollIndicators) {
      scrollViewRef.current.flashScrollIndicators();
    }
  };

  const onPressExitGame = () => {
    changeScreen(SCREENS.MENU);
    // TODO: is this timeout needed still since removing navigation?
    setTimeout(() => {
      onExitGame();
    }, 500);
  };

  const score = currentDefinitions.filter(d => d.isCorrect).length;
  const praise = getPraiseForScore(score, WORDS_PER_ROUND);
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
        disabled={userActionsDisabled}
      />
      <ContentContainer>
        <FeedbackTextContainer>
          <PopInView popToSize={1} duration={ANSWER_ANIMATION_START_DELAY_TIME} delay={150}>
            <MediumLargeText>{praise}</MediumLargeText>
          </PopInView>
        </FeedbackTextContainer>
        <ScrollViewContainer>
          <AnswersScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={showScrollBar}
            contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableWithoutFeedback>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {currentDefinitions.map((def, i) => (
                  <Answer
                    key={def._id}
                    delay={i * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME}
                    {...def}
                  />
                ))}
              </View>
            </TouchableWithoutFeedback>
          </AnswersScrollView>
        </ScrollViewContainer>
        <Footer>
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
              delay={totalAnimationTime + 350}
              onAnimationStart={onPlayAgainAnimationStart}>
              <PaddedButton onPress={onPressStartNewGame} disabled={userActionsDisabled}>
                <LargeText>Play Again</LargeText>
              </PaddedButton>
            </PopInView>
          </PlayAgain>
        </Footer>
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionPostGame;
