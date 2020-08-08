import React, { Fragment, useRef, useState, useMemo } from "react";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

import { MediumLargeText, NextRoundButton, ConnectedTopBar } from "../../../components";
import Answer from "./Answer";
import {
  ANSWER_ANIMATION_GAP_TIME,
  WORDS_PER_ROUND,
  ANSWER_ANIMATION_START_DELAY_TIME,
  ANSWER_ANIMATION_DURATION,
} from "../definitions-constants";
import PopInView from "../../../components/pop-in-view/PopInView";
import { getPraiseForScore } from "../definitions-utils";
import ScoreChange from "../../../components/score-change/ScoreChange";
import { LeaderboardButton } from "../../../components/button/Button";
import { MODES } from "../../../app-constants";
import SoundManager from "../../sound/SoundManager";
import { getSizingForOptions } from "../../../utils/sizing-utils";

const FOOTER_MARGIN_BOTTOM = getSizingForOptions("0%", "3%", "5%", "8%");
const ANSWERS_MARGIN_VERTICAL = getSizingForOptions(8, 12, 16, 26);

const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const FeedbackTextContainer = styled(View)`
  flex: 0.3;
  align-items: center;
  justify-content: center;
`;

const ScrollViewContainer = styled(View)`
  max-height: 70%;
  width: 100%;
`;

const AnswersScrollView = styled(ScrollView)`
  width: 100%;
  margin-vertical: ${ANSWERS_MARGIN_VERTICAL};
`;

const Footer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: ${FOOTER_MARGIN_BOTTOM};
`;

const DefinitionPostGame = ({
  onPressStartNewGame,
  currentDefinitions,
  netELOChange,
  currentELO,
  showLeaderboard,
}) => {
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [userActionsDisabled, setUserActionsDisabled] = useState(true);
  const scrollViewRef = useRef();

  const score = currentDefinitions.filter(d => d.isCorrect).length;
  const praise = useMemo(() => getPraiseForScore(score, WORDS_PER_ROUND), [currentDefinitions]);

  const totalAnimationTime =
    ANSWER_ANIMATION_START_DELAY_TIME +
    WORDS_PER_ROUND * ANSWER_ANIMATION_GAP_TIME +
    ANSWER_ANIMATION_DURATION;

  const onPraiseAnimationStart = () => {
    SoundManager.getInstance().playCorrectScoreChange();
  };

  const onPlayAgainAnimationStart = () => {
    setUserActionsDisabled(false);
    setShowScrollBar(true);
    if (scrollViewRef && scrollViewRef.current && scrollViewRef.current.flashScrollIndicators) {
      scrollViewRef.current.flashScrollIndicators();
    }
  };

  return (
    <Fragment>
      <ConnectedTopBar
        RightComponent={<LeaderboardButton onPress={() => showLeaderboard(MODES.DEFINITIONS)} />}
      />
      <ContentContainer>
        <FeedbackTextContainer>
          <PopInView
            popToSize={1}
            duration={ANSWER_ANIMATION_START_DELAY_TIME}
            delay={220}
            onAnimationStart={onPraiseAnimationStart}>
            <MediumLargeText testID="definitions-post-game-praise">
              {praise} - {score}/{WORDS_PER_ROUND}
            </MediumLargeText>
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
                    index={i}
                    delay={i * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME}
                    {...def}
                  />
                ))}
              </View>
            </TouchableWithoutFeedback>
          </AnswersScrollView>
        </ScrollViewContainer>
        <Footer>
          <ScoreChange
            previousScore={currentELO - netELOChange}
            scoreChange={netELOChange}
            delay={totalAnimationTime + 150}
          />
          <View>
            <NextRoundButton
              onPress={onPressStartNewGame}
              onAnimationStart={onPlayAgainAnimationStart}
              animateDelay={totalAnimationTime + 300}
              disabled={userActionsDisabled}
            />
          </View>
        </Footer>
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionPostGame;
