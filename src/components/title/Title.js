import React from "react";
import { TitleContainer } from "../containers/Containers";
import PopInView from "../pop-in-view/PopInView";
import { MediumLargeText } from "../text/Text";

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
