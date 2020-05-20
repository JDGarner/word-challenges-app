import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText } from "../../../components";
import { DIFFICULTIES } from "../../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const GameHeaderContainer = styled(View)`
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  height: 20%;
`;

const JUSTIFY_CONTENT = {
  [NOVICE]: "flex-end",
  [JOURNEYMAN]: "flex-end",
  [EXPERT]: "center",
  [MASTER]: "center",
};

const GameHeader = ({ word, difficulty }) => {
  const justifyContent = JUSTIFY_CONTENT[difficulty];

  return (
    <GameHeaderContainer justifyContent={justifyContent}>
      <MediumLargerText textAlign="center">{capitalize(word)}</MediumLargerText>
    </GameHeaderContainer>
  );
};

export default GameHeader;
