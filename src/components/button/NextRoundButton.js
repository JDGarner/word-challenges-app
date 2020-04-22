import React from "react";
import styled from "styled-components";
import { MediumLargeText, TEXT_TOP_PADDING } from "../text/Text";
import PopInView from "../pop-in-view/PopInView";
import SoundManager from "../../features/sound/SoundManager";
import AnimatedButton from "./AnimatedButton";

const NextRoundPaddedButton = styled(AnimatedButton)`
  padding-top: ${10 + TEXT_TOP_PADDING};
  padding-bottom: 10;
  padding-horizontal: 24;
`;

const NextRoundButton = ({ disabled, animateDelay, onPress, onAnimationStart }) => {
  const onPressPlayAgainButton = () => {
    SoundManager.getInstance().playMenuButtonSound();
    onPress();
  };

  return (
    <PopInView
      pointerEvents="auto"
      popToSize={1}
      duration={1300}
      delay={animateDelay}
      onAnimationStart={onAnimationStart}>
      <NextRoundPaddedButton onPress={onPressPlayAgainButton} disabled={disabled}>
        <MediumLargeText>Next Round</MediumLargeText>
      </NextRoundPaddedButton>
    </PopInView>
  );
};

export default NextRoundButton;
