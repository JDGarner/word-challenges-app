import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText } from "../../../components";
import { DIFFICULTIES } from "../../../app-constants";
import { getSizingForOptions } from "../../../utils/sizing-utils";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const HEADER_HEIGHT_FOR_DIFFICULTY = {
  [NOVICE]: getSizingForOptions("16%", "18%", "23%", "20%"),
  [JOURNEYMAN]: getSizingForOptions("10%", "14%", "22%", "20%"),
  [EXPERT]: getSizingForOptions("10%", "14%", "21%", "20%"),
  [MASTER]: getSizingForOptions("7%", "10%", "17%", "20%"),
};

const GameHeaderContainer = styled(View)`
  justify-content: flex-end;
  align-items: center;
  height: ${({ difficulty }) => HEADER_HEIGHT_FOR_DIFFICULTY[difficulty]};
`;

const GameHeader = ({ word, difficulty }) => {
  return (
    <GameHeaderContainer difficulty={difficulty}>
      <MediumLargerText textAlign="center">{capitalize(word)}</MediumLargerText>
    </GameHeaderContainer>
  );
};

export default GameHeader;
