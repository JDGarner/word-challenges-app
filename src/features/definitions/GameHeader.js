import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { MediumLargeText } from "../../components";

const GameHeaderContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const GameHeader = ({ definition }) => {
  return (
    <GameHeaderContainer>
      <MediumLargeText textAlign="center" testID="definitions-game-header">
        {capitalize(definition)}
      </MediumLargeText>
    </GameHeaderContainer>
  );
};

export default GameHeader;
