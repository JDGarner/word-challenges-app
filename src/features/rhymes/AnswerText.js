import React, { useState } from "react";
import styled from "styled-components";
import { TextInput } from "react-native";

const AnswerInput = styled(TextInput).attrs(props => ({
  placeholderTextColor: props.theme.textColor,
}))`
  color: ${props => props.theme.textColor};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.textColor};
  flex-shrink: 0;
  padding: 5px;
  margin-bottom: auto;
  min-width: 126px;
  text-align: center;
  font-size: ${props => props.theme.medium.fontSize};
  font-weight: ${props => props.theme.medium.fontWeight};
`;

const AnswerText = ({ onSubmitAnswer }) => {
  const [answerText, setAnswerText] = useState("");
  const [answerTextPlaceholder, setAnswerTextPlaceholder] = useState("Enter Rhyme");

  const onSubmitEditing = () => {
    onSubmitAnswer(answerText);

    setAnswerText("");
    setAnswerTextPlaceholder("");
  };

  return (
    <AnswerInput
      value={answerText}
      placeholder={answerTextPlaceholder}
      onChangeText={setAnswerText}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      autoFocus
    />
  );
};

export default AnswerText;
