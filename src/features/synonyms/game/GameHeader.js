import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText } from "../../../components";
import { DIFFICULTIES } from "../../../app-constants";
import { getSizingForOptions } from "../../../utils/sizing-utils";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;
const HEADER_HEIGHT = getSizingForOptions("8%", "14%", "20%", "20%");

const GameHeaderContainer = styled(View)`
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  height: ${HEADER_HEIGHT};
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
