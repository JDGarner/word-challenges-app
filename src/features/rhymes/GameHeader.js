import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { MediumText, LargeText, TextContainer } from "../../components";

const PreGameHeader = styled(View)`
  height: 30%;
  margin-bottom: 40px;
  justify-content: flex-end;
  align-items: center;
`;

const PreGameMessage = styled(MediumText)`
  margin-bottom: 20px;
`;

const CurrentWordContainer = styled(TextContainer)`
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
`;

const GameHeader = ({ word }) => {
  return (
    <PreGameHeader>
      <PreGameMessage>What Rhymes with...</PreGameMessage>
      <CurrentWordContainer>
        <LargeText>{capitalize(word)}</LargeText>
      </CurrentWordContainer>
    </PreGameHeader>
  );
};

export default GameHeader;
