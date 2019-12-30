import React, { Fragment } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { LargeText, PaddedButton, MediumText } from "../../../components";
import theme from "../../../theme";
import TopBar from "../TopBar";

const ContentContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const AnswersContainer = styled(View)``;

const PlayAgain = styled(View)`
  margin-top: 60;
`;

const DefinitionPostGame = ({
  onPressStartNewGame,
  onExitGame,
  currentDefinitions,
  navigation,
}) => {
  const onPressExitGame = () => {
    navigation.goBack();
    setTimeout(() => {
      onExitGame();
    }, 500);
  };

  return (
    <Fragment>
      <TopBar onPressExitGame={onPressExitGame} />
      <ContentContainer>
        <AnswersContainer>
          {currentDefinitions.map(def => (
            <MediumText
              key={def._id}
              color={def.isCorrect ? theme.correctColor : theme.incorrectColor}>
              {def.word} - {def.definition}
            </MediumText>
          ))}
        </AnswersContainer>
        <PlayAgain>
          <PaddedButton onPress={onPressStartNewGame}>
            <LargeText>Play Again</LargeText>
          </PaddedButton>
        </PlayAgain>
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionPostGame;
