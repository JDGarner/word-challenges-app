import React from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText, TextContainer, PopInView, Title } from "../../components";
import { TEXT_TOP_PADDING } from "../../components/text/Text";
import { ANSWERS_REQUIRED } from "./rhymes-constants";
import { getSizingForOptions } from "../../utils/sizing-utils";

const WORD_MARGIN_TOP = getSizingForOptions(14, 16, 18, 28);
const WORD_MARGIN_BOTTOM = getSizingForOptions(12, 22, 28, 48);
const WORD_PADDING_V = getSizingForOptions(8, 9, 10, 18);
const WORD_PADDING_H = getSizingForOptions(28, 30, 32, 58);

const CurrentWordContainer = styled(TextContainer)`
  justify-content: center;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + WORD_PADDING_V};
  padding-bottom: ${WORD_PADDING_V};
  padding-horizontal: ${WORD_PADDING_H};
  margin-top: ${WORD_MARGIN_TOP};
  margin-bottom: ${WORD_MARGIN_BOTTOM};
`;

const GameHeader = ({ word, fadeIn }) => {
  const WordContainer = (
    <CurrentWordContainer>
      <MediumLargerText>{capitalize(word)}</MediumLargerText>
    </CurrentWordContainer>
  );

  return (
    <>
      <Title text={`Find ${ANSWERS_REQUIRED} rhymes for...`} fadeIn={fadeIn} delay={null} />
      {fadeIn ? (
        <PopInView popToSize={1} duration={800} delay={500}>
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
