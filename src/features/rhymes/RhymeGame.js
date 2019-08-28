import React, { Component } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";

import { LargeText, MediumText, CenteredContainer, HideKeyboardOnTouch } from "../../components";
import colors from "../../theme/colors";
import AnswerText from "./AnswerText";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
`;

const GivenTextContainer = styled(CenteredContainer)`
  flex: 1;
`;

const GivenTextHeading = styled(MediumText)`
  margin-bottom: 20px;
`;

const GivenText = styled(LargeText)`
  margin-bottom: 20px;
`;

export default class RhymeGame extends Component {
  constructor(props) {
    super(props);

    const givenWord = props.words && props.words[0] ? props.words[0].word : "";

    this.state = {
      givenWord,
      answerText: "",
      animatedAnswer: "",
      answerTextPlaceholder: "Enter Rhyme",
    };
  }

  onChangeAnswerText = answerText => {
    this.setState({ answerText });
  };

  isAnswerCorrect = () => true;

  onSubmitAnswer = () => {
    // TODO: check if answer is correct
    // TODO: animate answer based on correctness
    // const isCorrect = this.isAnswerCorrect();
    const { answerText } = this.state;

    this.setState({
      answerText: "",
      answerTextPlaceholder: "",
      animatedAnswer: answerText,
    });
  };

  render() {
    const { givenWord, answerText, animatedAnswer, answerTextPlaceholder } = this.state;

    return (
      <HideKeyboardOnTouch>
        <ScreenContainer>
          <GivenTextContainer>
            <GivenTextHeading color={colors.subdued}>What Rhymes with...</GivenTextHeading>
            <GivenText>{capitalize(givenWord)}</GivenText>
          </GivenTextContainer>

          <AnswerText
            answerText={answerText}
            animatedAnswer={animatedAnswer}
            placeholder={answerTextPlaceholder}
            onSubmitAnswer={this.onSubmitAnswer}
            onChangeAnswerText={this.onChangeAnswerText}
          />
        </ScreenContainer>
      </HideKeyboardOnTouch>
    );
  }
}
