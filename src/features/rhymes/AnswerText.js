import React, { Component } from "react";
import styled from "styled-components";
import { TextInput } from "react-native";

import { TextContainer } from "../../components";

const AnswerInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-bottom-color: #939393;
  flex-shrink: 0;
  padding: 5px;
  margin-bottom: auto;
  min-width: 135px;
  text-align: center;
  font-size: ${props => props.theme.medium.fontSize};
  font-weight: ${props => props.theme.medium.fontWeight};
`;

const StyledTextContainer = styled(TextContainer)`
  padding: 8px;
`;

export default class AnswerText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerText: "",
      answerTextPlaceholder: "Enter Rhyme",
    };
  }

  onChangeAnswerText = answerText => {
    this.setState({ answerText });
  };

  onSubmitAnswer = () => {
    this.props.onSubmitAnswer(this.state.answerText);

    this.setState({
      answerText: "",
      answerTextPlaceholder: "",
    });
  };

  render() {
    const { answerText, answerTextPlaceholder } = this.state;

    return (
      <StyledTextContainer>
        <AnswerInput
          value={answerText}
          placeholder={answerTextPlaceholder}
          onChangeText={this.onChangeAnswerText}
          onSubmitEditing={this.onSubmitAnswer}
          blurOnSubmit={false}
          autoFocus
        />
      </StyledTextContainer>
    );
  }
}
