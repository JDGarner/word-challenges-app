import React from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";

import { SmallText, TextContainer, PopInView, AnimatedSequence } from "../../components";
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

const AnswerText = styled(SmallText)`
  text-align: center;
`;

const AnswerContainer = styled(TextContainer)`
  margin-horizontal: 10px;
  padding: 4px 2px;
`;

const GridItem = styled(View)`
  width: 33.33333333%;
  margin-bottom: 10px;
`;

const AnswerGrid = ({ answers, postGame = false }) => {
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
      containerStyle={{ width: "33.333333%", marginBottom: 10 }}
      animationGapTime={ANSWER_ANIMATION_GAP_TIME}
      animationStartDelay={ANSWER_ANIMATION_START_DELAY_TIME}
      popToSize={1.05}
    />
  ) : (
    answers.map(answer => {
      return (
        <GridItem key={answer}>
          <PopInView>
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
