import React from "react";
import { MediumLargeText, TitleContainer, PopInView } from "../../components";

const Title = ({ fadeIn, text }) => {
  if (fadeIn) {
    return (
      <TitleContainer>
        <PopInView popToSize={1} duration={800} delay={20}>
          <MediumLargeText>{text}</MediumLargeText>
        </PopInView>
      </TitleContainer>
    );
  }

  return (
    <TitleContainer>
      <MediumLargeText>{text}</MediumLargeText>
    </TitleContainer>
  );
};

Title.defaultProps = {
  fadeIn: true,
};

export default Title;
