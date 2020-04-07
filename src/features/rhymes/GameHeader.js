import React from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumLargerText, TextContainer, PopInView, Title } from "../../components";
import { TEXT_TOP_PADDING } from "../../components/text/Text";
import { ANSWERS_REQUIRED } from "./rhymes-constants";

const CurrentWordContainer = styled(TextContainer)`
  justify-content: center;
  align-items: center;
  padding-top: ${TEXT_TOP_PADDING + 10};
  padding-bottom: 10;
  padding-horizontal: 32;
  margin-top: 18;
  margin-bottom: 28;
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
