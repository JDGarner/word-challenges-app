import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { getAnswerTextProps, getCurrentAnswerIndexes } from "../definitions-utils";
import AnswerLetter from "./AnswerLetter";

const AnswersContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const AnswerLetters = ({
  word,
  lettersState,
  isShowingFeedback,
  userActionsDisabled,
  removeAnswerLetter,
}) => {
  const answerTextProps = getAnswerTextProps(lettersState.length);

  const renderAnswerLetters = () => {
    if (isShowingFeedback) {
      word
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

    return getCurrentAnswerIndexes(lettersState).map((answerIndex, i) => {
      if (answerIndex !== null) {
        const letterState = lettersState.find(ls => ls.answerIndex === answerIndex);

        return (
          <AnswerLetter
            key={i}
            disabled={userActionsDisabled || letterState.isFreeLetter}
            onPressLetter={() => removeAnswerLetter(letterState)}
            letter={letterState.letter}
            isFreeLetter={letterState.isFreeLetter}
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
