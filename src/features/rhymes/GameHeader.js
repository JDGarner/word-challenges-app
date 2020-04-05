import React from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText, TextContainer, PopInView, Title } from "../../components";
import { TEXT_TOP_PADDING } from "../../components/text/Text";
import { PRE_GAME_COUNTDOWN_DELAY, ANSWERS_REQUIRED } from "./rhymes-constants";

const CurrentWordContainer = styled(TextContainer)`
  justify-content: center;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + 10};
  padding-bottom: 10;
  padding-horizontal: 32;
  margin-top: 18;
  margin-bottom: 60;
`;

const GameHeader = ({ word, fadeIn }) => {
  const WordContainer = (
    <CurrentWordContainer>
      <MediumLargerText>{capitalize(word)}</MediumLargerText>
    </CurrentWordContainer>
  );

  return (
    <>
      <Title text={`Find ${ANSWERS_REQUIRED} rhymes for...`} fadeIn={fadeIn} />
      {fadeIn ? (
        <PopInView popToSize={1} duration={PRE_GAME_COUNTDOWN_DELAY}>
          {WordContainer}
        </PopInView>
      ) : (
        WordContainer
      )}
    </>
  );
};

GameHeader.defaultProps = {
  fadeIn: false,
};

export default GameHeader;
