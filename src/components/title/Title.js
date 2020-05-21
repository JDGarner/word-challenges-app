import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import PopInView from "../pop-in-view/PopInView";
import { MediumLargeText } from "../text/Text";
import { getSizingForOptions } from "../../utils/sizing-utils";

const TITLE_HEIGHT = getSizingForOptions("9%", "11%", "12%", "11%");

const TitleContainer = styled(View)`
  height: ${TITLE_HEIGHT};
  justify-content: flex-end;
  align-items: center;
`;

const Title = ({ fadeIn, text, delay }) => {
  if (fadeIn) {
    return (
      <TitleContainer>
        <PopInView popToSize={1} duration={800} delay={delay}>
          <MediumLargeText textAlign="center">{text}</MediumLargeText>
        </PopInView>
      </TitleContainer>
    );
  }

  return (
    <TitleContainer>
      <MediumLargeText textAlign="center">{text}</MediumLargeText>
    </TitleContainer>
  );
};

Title.defaultProps = {
  fadeIn: true,
  delay: 20,
};

export default Title;
