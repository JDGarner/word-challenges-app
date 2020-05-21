import React from "react";
import { capitalize } from "lodash";
import { View } from "react-native";
import styled from "styled-components";

import { MediumText, AnimatedSequence } from "../../../components";
import colors from "../../../theme/colors";
import { getSizingForOptions } from "../../../utils/sizing-utils";
import AnimatedButton from "../../../components/button/AnimatedButton";
import { DIFFICULTIES } from "../../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const ANSWER_ANIMATION_GAP_TIME = 70;
const ANSWER_ANIMATION_START_DELAY_TIME = 0;

const PADDING_H = getSizingForOptions(2, 2, 2, 10);
const MARGIN_H = getSizingForOptions(10, 10, 10, 36);
const MARGIN_TOP = getSizingForOptions(2, 10, 14, 24);

const PADDING_V_FOR_DIFFICULTY = {
  [NOVICE]: getSizingForOptions(10, 10, 10, 22),
  [JOURNEYMAN]: getSizingForOptions(10, 10, 10, 22),
  [EXPERT]: getSizingForOptions(8, 9, 10, 22),
  [MASTER]: getSizingForOptions(7, 8, 10, 22),
};

const GridContainer = styled(View)`
  width: 100%;
  margin-top: ${MARGIN_TOP};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AnswerText = styled(MediumText)`
  text-align: center;
`;

const getAnswerContainerStyle = (isEven, difficulty) => [
  {
    marginRight: isEven ? MARGIN_H : 0,
    marginLeft: !isEven ? MARGIN_H : 0,
    paddingVertical: PADDING_V_FOR_DIFFICULTY[difficulty],
    paddingHorizontal: PADDING_H,
    borderRadius: 4,
  },
];

const gridItemBottomMargin = 18;

const AnswerGrid = ({ answers, difficulty, onPressAnswer, onAnimationEnd, disabled }) => {
  const getAnswerTiles = () => {
    return answers.map((answer, i) => {
      const fromColour = answer.isSelected ? colors.textColorSelected : colors.textColorLighter;
      const toColour = answer.isSelected ? colors.textColorSelectedAgain : colors.textColorSelected;

      return {
        id: answer.word,
        component: (
          <AnimatedButton
            onPress={() => onPressAnswer(answer, i)}
            style={getAnswerContainerStyle(i % 2 === 0, difficulty)}
            fromColour={fromColour}
            toColour={toColour}
            inTextContainer={false}
            disabled={disabled}>
            <AnswerText>{capitalize(answer.word)}</AnswerText>
          </AnimatedButton>
        ),
      };
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <GridContainer>
        <AnimatedSequence
          items={getAnswerTiles()}
          containerStyle={{ width: "50%", marginBottom: gridItemBottomMargin }}
          animationGapTime={ANSWER_ANIMATION_GAP_TIME}
          animationStartDelay={ANSWER_ANIMATION_START_DELAY_TIME}
          popToSize={1.1}
          animationAppearDuration={300}
          onAnimationEnd={onAnimationEnd}
        />
      </GridContainer>
    </View>
  );
};

export default AnswerGrid;
