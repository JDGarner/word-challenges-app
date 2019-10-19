import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { LargeText, PaddedButton, MediumText } from "../../../components";
import theme from "../../../theme";

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

const DefinitionPostGame = ({ onPressStartNewGame, currentDefinitions }) => {
  return (
    <PostGameContainer>
      {currentDefinitions.map(def => (
        <MediumText color={def.isCorrect ? theme.correctColor : theme.incorrectColor}>
          {def.word} - {def.definition}
        </MediumText>
      ))}
      <PlayAgain>
        <PaddedButton onPress={onPressStartNewGame}>
          <LargeText>Play Again</LargeText>
        </PaddedButton>
      </PlayAgain>
    </PostGameContainer>
  );
};

export default DefinitionPostGame;
