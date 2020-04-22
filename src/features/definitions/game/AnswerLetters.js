import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { getAnswerTextProps } from "../definitions-utils";
import AnswerLetter from "./AnswerLetter";

const AnswersContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const AnswerLetters = ({
  word,
  answersState,
  isShowingFeedback,
  userActionsDisabled,
  removeAnswerLetter,
}) => {
  const answerTextProps = getAnswerTextProps(answersState.length);

  const renderAnswerLetters = () => {
    if (isShowingFeedback) {
      return word
        .toUpperCase()
        .split("")
        .map((letter, i) => (
          <AnswerLetter
            key={`${letter}-${i}`}
            disabled
            isFeedbackLetter
            letter={letter}
            {...answerTextProps}
          />
        ));
    }

    return answersState.map((answer, i) => {
      if (answer) {
        return (
          <AnswerLetter
            key={i}
            disabled={userActionsDisabled || answer.isFreeLetter}
            onPressLetter={() => removeAnswerLetter(answer)}
            letter={answer.letter}
            isFreeLetter={answer.isFreeLetter}
            {...answerTextProps}
          />
        );
      }

      return <AnswerLetter key={i} disabled letter="" {...answerTextProps} />;
    });
  };

  return <AnswersContainer>{renderAnswerLetters()}</AnswersContainer>;
};

AnswerLetters.defaultProps = {
  onPressLetter: () => {},
};

export default AnswerLetters;
