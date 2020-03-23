import React from "react";
import { TitleContainer } from "../containers/Containers";
import PopInView from "../pop-in-view/PopInView";
import { MediumLargeText } from "../text/Text";

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
