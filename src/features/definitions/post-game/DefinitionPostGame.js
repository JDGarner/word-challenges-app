import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { LargeText, PaddedButton } from "../../../components";

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: 15px;
  margin-bottom: 20px;
`;

const PlayAgain = styled(View)`
  margin-top: 20px;
`;

const DefinitionPostGame = ({ onPressStartNewGame }) => {
  return (
    <PostGameContainer>
      <PlayAgain>
        <PaddedButton onPress={onPressStartNewGame}>
          <LargeText>Play Again</LargeText>
        </PaddedButton>
      </PlayAgain>
    </PostGameContainer>
  );
};

export default DefinitionPostGame;
