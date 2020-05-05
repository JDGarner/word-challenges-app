import React from "react";
import styled from "styled-components";
import { MediumLargeText, TEXT_TOP_PADDING } from "../text/Text";
import PopInView from "../pop-in-view/PopInView";
import SoundManager from "../../features/sound/SoundManager";
import AnimatedButton from "./AnimatedButton";
import { getSizingForOptions } from "../../utils/sizing-utils";

const BUTTON_PADDING_VERTICAL = getSizingForOptions(8, 9, 10);
const BUTTON_PADDING_HORIZONTAL = getSizingForOptions(20, 22, 24);

const NextRoundPaddedButton = styled(AnimatedButton)`
  padding-top: ${BUTTON_PADDING_VERTICAL + TEXT_TOP_PADDING};
  padding-bottom: ${BUTTON_PADDING_VERTICAL};
  padding-horizontal: ${BUTTON_PADDING_HORIZONTAL};
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
