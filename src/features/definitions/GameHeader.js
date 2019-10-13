import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { LargeText, TextContainer } from "../../components";

const PreGameHeader = styled(View)`
  height: 30%;
  margin-bottom: 40px;
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
      <LargeText>{capitalize(definition)}</LargeText>
    </PreGameHeader>
  );
};

export default GameHeader;
