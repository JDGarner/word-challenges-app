import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import theme from "../../../theme";

const BORDER_RADIUS = 8;

const ProgressBarContainer = styled(View)`
  width: 100%;
  height: 20;
  flex-direction: row;
  border-radius: ${BORDER_RADIUS};
  border-width: 2;
  border-color: ${props => props.theme.progressBarColor};
`;

const ProgressChunk = styled(View)`
  flex: 1;
  height: 100%;
  /* border-left-width: ${props => (props.isLast ? 0 : 4)};; */
  border-right-width: ${props => (props.isLast ? 0 : 4)};
  border-color: ${props => props.theme.progressBarColor};
  background-color: ${props => props.color};
  border-bottom-left-radius: ${props => (props.isFirst ? BORDER_RADIUS : 0)};
  border-top-left-radius: ${props => (props.isFirst ? BORDER_RADIUS : 0)};
  border-bottom-right-radius: ${props => (props.isLast ? BORDER_RADIUS : 0)};
  border-top-right-radius: ${props => (props.isLast ? BORDER_RADIUS : 0)};
`;

const getProgressChunkColor = (isCorrect, defIndex, currentDefinitionIndex) => {
  if (defIndex >= currentDefinitionIndex) {
    return "transparent";
  }

  return isCorrect ? theme.correctColor : theme.incorrectColor;
};

const ProgressBar = ({ definitions, currentDefinitionIndex }) => {
  return (
    <ProgressBarContainer>
      {definitions.map((def, i) => (
        <ProgressChunk
          isFirst={i === 0}
          isLast={i === definitions.length - 1}
          color={getProgressChunkColor(def.isCorrect, i, currentDefinitionIndex)}
        />
      ))}
    </ProgressBarContainer>
  );
};

export default ProgressBar;
