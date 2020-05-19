import React from "react";
import { capitalize } from "lodash";
import { View } from "react-native";
import styled from "styled-components";

import { MediumText, AnimatedSequence } from "../../../components";
import colors from "../../../theme/colors";
import SoundManager from "../../sound/SoundManager";
import { getSizingForOptions } from "../../../utils/sizing-utils";
import AnimatedButton from "../../../components/button/AnimatedButton";

const ANSWER_ANIMATION_GAP_TIME = 70;
const ANSWER_ANIMATION_START_DELAY_TIME = 0;

const PADDING_V = getSizingForOptions(10, 10, 10, 22);
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

const answerContainerStyle = [
  {
    marginHorizontal: MARGIN_H,
    paddingVertical: PADDING_V,
    paddingHorizontal: PADDING_H,
    borderRadius: 4,
  },
];

const gridItemBottomMargin = 18;

const AnswerGrid = ({ answers, onPressAnswer }) => {
  const getAnswerTiles = () => {
    return answers.map((answer, i) => {
      const fromColour = answer.isSelected ? colors.textColorSelected : colors.textColorLighter;
      const toColour = answer.isSelected ? colors.textColorSelectedAgain : colors.textColorSelected;

      return {
        id: answer.word,
        component: (
          <AnimatedButton
            onPress={() => onPressAnswer(answer, i)}
            style={answerContainerStyle}
            fromColour={fromColour}
            toColour={toColour}
            inTextContainer={false}>
            <AnswerText>{capitalize(answer.word)}</AnswerText>
          </AnimatedButton>
        ),
      };
    });
  };

  return (
    <GridContainer>
      <AnimatedSequence
        items={getAnswerTiles()}
        containerStyle={{ width: "50%", marginBottom: gridItemBottomMargin }}
        animationGapTime={ANSWER_ANIMATION_GAP_TIME}
        animationStartDelay={ANSWER_ANIMATION_START_DELAY_TIME}
        popToSize={1.1}
        animationAppearDuration={300}
      />
    </GridContainer>
  );
};

export default AnswerGrid;
