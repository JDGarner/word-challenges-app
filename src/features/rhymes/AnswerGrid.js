import React from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";

import { MediumText, TextContainer, PopInView, AnimatedSequence } from "../../components";
import { ANSWER_ANIMATION_GAP_TIME, ANSWER_ANIMATION_START_DELAY_TIME } from "./rhymes-constants";

const GridContainer = styled(View)`
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

const AnswerText = styled(MediumText)`
  text-align: center;
`;

const AnswerContainer = styled(TextContainer)`
  margin-horizontal: 14px;
  padding: 10px 2px;
`;

const GridItem = styled(View)`
  width: 50%;
  margin-bottom: 16px;
`;

const AnswerGrid = ({ answers, postGame = false, onAnswerAnimationEnd }) => {
  const getAnswerTiles = () => {
    return answers.map(answer => ({
      id: answer,
      component: (
        <AnswerContainer>
          <AnswerText>{answer}</AnswerText>
        </AnswerContainer>
      ),
    }));
  };

  const gridItems = postGame ? (
    <AnimatedSequence
      items={getAnswerTiles()}
      containerStyle={{ width: "50%", marginBottom: 10 }}
      animationGapTime={ANSWER_ANIMATION_GAP_TIME}
      animationStartDelay={ANSWER_ANIMATION_START_DELAY_TIME}
      popToSize={1.05}
    />
  ) : (
    answers.map(answer => {
      return (
        <GridItem key={answer}>
          <PopInView onAnimationEnd={onAnswerAnimationEnd}>
            <AnswerContainer>
              <AnswerText>{answer}</AnswerText>
            </AnswerContainer>
          </PopInView>
        </GridItem>
      );
    })
  );

  return (
    <GridContainer>
      <ScrollView contentContainerStyle={answerGridStyle}>{gridItems}</ScrollView>
    </GridContainer>
  );
};

export default AnswerGrid;
