import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { MediumLargeText, TextContainer } from "../../components";

const PreGameHeader = styled(View)`
  height: 15%;
  justify-content: flex-end;
  align-items: center;
`;

// const CurrentWordContainer = styled(TextContainer)`
//   padding: 4px 20px;
//   justify-content: center;
//   align-items: center;
// `;

const GameHeader = ({ definition }) => {
  return (
    <PreGameHeader>
      <MediumLargeText textAlign="center">{capitalize(definition)}</MediumLargeText>
    </PreGameHeader>
  );
};

export default GameHeader;
