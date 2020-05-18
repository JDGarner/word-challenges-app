import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText } from "../../../components";

const GameHeaderContainer = styled(View)`
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const GameHeader = ({ word }) => {
  return (
    <GameHeaderContainer>
      <MediumLargerText textAlign="center">{capitalize(word)}</MediumLargerText>
    </GameHeaderContainer>
  );
};

export default GameHeader;
