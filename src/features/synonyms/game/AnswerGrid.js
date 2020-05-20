import React from "react";
import { capitalize } from "lodash";
import { View } from "react-native";
import styled from "styled-components";

import { MediumText, AnimatedSequence } from "../../../components";
import colors from "../../../theme/colors";
import { getSizingForOptions } from "../../../utils/sizing-utils";
import AnimatedButton from "../../../components/button/AnimatedButton";

const ANSWER_ANIMATION_GAP_TIME = 70;
const ANSWER_ANIMATION_START_DELAY_TIME = 0;

const PADDING_V = getSizingForOptions(10, 10, 10, 22);
const PADDING_H = getSizingForOptions(2, 2, 2, 10);
const MARGIN_H = getSizingForOptions(10, 10, 10, 34);

const GridContainer = styled(View)`
  width: 100%;
  margin-top: 14px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AnswerText = styled(MediumText)`
  text-align: center;
`;

const getAnswerContainerStyle = isEven => [
  {
    marginRight: isEven ? MARGIN_H : 0,
    marginLeft: !isEven ? MARGIN_H : 0,
    paddingVertical: PADDING_V,
    paddingHorizontal: PADDING_H,
    borderRadius: 4,
  },
];

const gridItemBottomMargin = 18;

const AnswerGrid = ({ answers, onPressAnswer, disabled }) => {
  const getAnswerTiles = () => {
    return answers.map((answer, i) => {
      const fromColour = answer.isSelected ? colors.textColorSelected : colors.textColorLighter;
      const toColour = answer.isSelected ? colors.textColorSelectedAgain : colors.textColorSelected;

      return {
        id: answer.word,
        component: (
          <AnimatedButton
            onPress={() => onPressAnswer(answer, i)}
            style={getAnswerContainerStyle(i % 2 === 0)}
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
        />
      </GridContainer>
    </View>
  );
};

export default AnswerGrid;
