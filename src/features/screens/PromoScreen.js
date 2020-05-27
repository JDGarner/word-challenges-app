import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { BorderedButton } from "../../components";
import { TEXT_TOP_PADDING, MediumLargeText } from "../../components/text/Text";
import colors from "../../theme/colors";

const LETTER_SIZE = 58;
const MARGIN_SIZE = 6;

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
`;

const RowContainer = styled(View)`
  height: 100%;
  justify-content: flex-start;
  align-items: flex-end;
`;

const LetterButton = styled(BorderedButton)`
  justify-content: center;
  align-items: center;
  margin-vertical: ${MARGIN_SIZE};
  margin-horizontal: ${MARGIN_SIZE};
  height: ${LETTER_SIZE};
  width: ${LETTER_SIZE};
  padding-right: ${TEXT_TOP_PADDING};
`;

const row1 = "AXOMASYNORHYPH".split("");
const row2 = "ILANTHROINCEND".split("");
const row3 = "ARYKHRUANGAPPEL".split("");
const row4 = "LLEJAOLINGFELLB".split("");
const row5 = "ANEOGENICVIRULE".split("");
const rowMiddle = [
  { letter: "J" },
  { letter: "A" },
  { letter: "M" },
  { letter: "W", highlight: true },
  { letter: "O", highlight: true },
  { letter: "R", highlight: true },
  { letter: "D", highlight: true },
  { letter: "I" },
  { letter: "E" },
  { letter: "G" },
];
const rowMiddle2 = [
  { letter: "Q" },
  { letter: "U" },
  { letter: "M", highlight: true },
  { letter: "O", highlight: true },
  { letter: "N", highlight: true },
  { letter: "K", highlight: true },
  { letter: "E", highlight: true },
  { letter: "Y", highlight: true },
  { letter: "O" },
  { letter: "I" },
  { letter: "H" },
];

const getStyleForLetter = l => {
  if (l.highlight) {
    return { backgroundColor: colors.textColorDisabled };
  }

  return {
    borderColor: colors.textColorPromoDisabled,
  };
};

const getTextColorForLetter = l => {
  if (l.highlight) {
    return colors.textColorBright;
  }

  return colors.textColorPromoDisabled;
};

const disabledButtonStyle = {
  borderColor: colors.textColorPromoDisabled,
};

const Row = ({ rowText }) => {
  return (
    <RowContainer>
      {rowText.map(l => {
        return (
          <LetterButton onPress={() => {}} style={disabledButtonStyle}>
            <MediumLargeText
              color={colors.textColorPromoDisabled}
              style={{ transform: [{ rotate: "90deg" }] }}>
              {l}
            </MediumLargeText>
          </LetterButton>
        );
      })}
    </RowContainer>
  );
};

const PromoScreen = () => {
  return (
    <Container>
      {/* <Row rowText={row1} /> */}
      <Row rowText={row2} />
      <Row rowText={row4} />

      <RowContainer>
        {rowMiddle2.map(l => {
          return (
            <LetterButton onPress={() => {}} style={getStyleForLetter(l)}>
              <MediumLargeText
                color={getTextColorForLetter(l)}
                style={{ transform: [{ rotate: "90deg" }] }}>
                {l.letter}
              </MediumLargeText>
            </LetterButton>
          );
        })}
      </RowContainer>
      <RowContainer>
        {rowMiddle.map(l => {
          return (
            <LetterButton onPress={() => {}} style={getStyleForLetter(l)}>
              <MediumLargeText
                color={getTextColorForLetter(l)}
                style={{ transform: [{ rotate: "90deg" }] }}>
                {l.letter}
              </MediumLargeText>
            </LetterButton>
          );
        })}
      </RowContainer>

      <Row rowText={row3} />
      <Row rowText={row5} />
    </Container>
  );
};

export default PromoScreen;
