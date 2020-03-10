import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { MediumLargeText, LargeText, TextContainer } from "../../components";
import { TEXT_TOP_PADDING } from "../../components/text/Text";

const PreGameMessageContainer = styled(View)`
  height: 12%;
  justify-content: flex-end;
  align-items: center;
`;

const PreGameMessage = styled(MediumLargeText)``;

const CurrentWordContainer = styled(TextContainer)`
  justify-content: center;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + 10};
  padding-bottom: 10;
  padding-horizontal: 36;
  margin-vertical: 18;
`;

const GameHeader = ({ word }) => {
  return (
    <>
      <PreGameMessageContainer>
        <PreGameMessage>What Rhymes with...</PreGameMessage>
      </PreGameMessageContainer>
      <CurrentWordContainer>
        <LargeText>{capitalize(word)}</LargeText>
      </CurrentWordContainer>
    </>
  );
};

export default GameHeader;
