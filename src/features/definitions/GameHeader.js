import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { capitalize } from "lodash";
import { MediumLargeText } from "../../components";

const PreGameHeader = styled(View)`
  justify-content: center;
  align-items: center;
`;

const GameHeader = ({ definition }) => {
  return (
    <PreGameHeader>
      <MediumLargeText textAlign="center">{capitalize(definition)}</MediumLargeText>
    </PreGameHeader>
  );
};

export default GameHeader;
