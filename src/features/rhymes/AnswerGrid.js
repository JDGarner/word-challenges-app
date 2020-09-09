import React from "react";
import { capitalize } from "lodash";
import { View } from "react-native";
import styled from "styled-components";

import { MediumText, PopInView, AnimatedSequence } from "../../components";
import { ANSWER_ANIMATION_GAP_TIME, ANSWER_ANIMATION_START_DELAY_TIME } from "./rhymes-constants";
import colors from "../../theme/colors";
import SoundManager from "../sound/SoundManager";
import { getSizingForOptions } from "../../utils/sizing-utils";

const PADDING_V = getSizingForOptions(8, 9, 10, 22);
const PADDING_H = getSizingForOptions(2, 2, 2, 10);
const MARGIN_H = getSizingForOptions(14, 14, 14, 34);

const GridContainer = styled(View)`
  height: 30%;
  width: 100%;
  margin-top: 14px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AnswerText = styled(MediumText)`
  text-align: center;
`;

const AnswerContainer = styled(View)`
  margin-horizontal: ${MARGIN_H};
  padding-vertical: ${PADDING_V};
  padding-horizontal: ${PADDING_H};
  background-color: ${colors.textColorLighter};
  border-radius: 4px;
`;

const gridItemBottomMargin = 18;

const GridItem = styled(View)`
  width: 50%;
  margin-bottom: ${gridItemBottomMargin};
`;

const AnswerGrid = ({ answers, postGame = false, onAnswerAnimationEnd }) => {
  const onAnswerAnimationStart = (index) => {
    SoundManager.getInstance().playFlubSound(index + 1);
  };

  const getAnswerTiles = () => {
    return answers.map((answer) => ({
      id: answer,
      component: (
        <AnswerContainer>
          <AnswerText>{capitalize(answer)}</AnswerText>
        </AnswerContainer>
      ),
    }));
  };

  const gridItems = postGame ? (
    <AnimatedSequence
      items={getAnswerTiles()}
      containerStyle={{ width: "50%", marginBottom: gridItemBottomMargin }}
      animationGapTime={ANSWER_ANIMATION_GAP_TIME}
      animationStartDelay={ANSWER_ANIMATION_START_DELAY_TIME}
      onAnimationStart={onAnswerAnimationStart}
      popToSize={1.1}
      animationAppearDuration={300}
    />
  ) : (
    answers.map((answer) => {
      return (
        <GridItem key={answer}>
          <PopInView onAnimationEnd={onAnswerAnimationEnd}>
            <AnswerContainer>
              <AnswerText>{capitalize(answer)}</AnswerText>
            </AnswerContainer>
          </PopInView>
        </GridItem>
      );
    })
  );

  return <GridContainer>{gridItems}</GridContainer>;
};

export default AnswerGrid;
