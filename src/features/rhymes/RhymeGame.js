import React, { Component } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";

import {
  LargeText,
  MediumText,
  SmallText,
  CenteredContainer,
  HideKeyboardOnTouch,
  TextContainer,
} from "../../components";
import AnswerText from "./AnswerText";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
  justify-content: space-around;
`;

const CorrectAnswers = styled(CenteredContainer)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  border-width: 1;
  border-color: red;
`;

const CorrectAnswer = styled(SmallText)`
  text-align: center;
  height: 20;
  width: 30%;
  border-width: 1;
  border-color: blue;
`;

const CurrentWordHeading = styled(MediumText)`
  margin-bottom: 14px;
`;

const CurrentWordContainer = styled(TextContainer)`
  margin-bottom: 20px;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
`;

export default class RhymeGame extends Component {
  render() {
    const { currentWord, currentRhymes, correctAnswers, onSubmitAnswer } = this.props;

    console.log(">>> correctAnswers: ", correctAnswers);

    return (
      <HideKeyboardOnTouch>
        <ScreenContainer>
          <CurrentWordContainer>
            <LargeText>{capitalize(currentWord)}</LargeText>
          </CurrentWordContainer>

          {/* <CorrectAnswers>
            {correctAnswers.map(answer => {
              return <CorrectAnswer key={answer}>{answer}</CorrectAnswer>;
            })}
          </CorrectAnswers> */}

          <AnswerText currentRhymes={currentRhymes} onSubmitAnswer={onSubmitAnswer} />
        </ScreenContainer>
      </HideKeyboardOnTouch>
    );
  }
}
