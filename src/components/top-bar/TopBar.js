import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { BackButton } from "../../components/button/Button";
import { Countdown } from "../../components";
import PopInView from "../../components/pop-in-view/PopInView";

const TopBarContainer = styled(View)`
  height: 70;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
`;

const TopBar = ({
  gameCountdown,
  onPressBack,
  animateDuration,
  animateDelay,
  animatingCountdown,
  onAnimationEnd,
  disabled,
}) => {
  const BackButtonComponent = animateDuration ? (
    <PopInView pointerEvents="auto" popToSize={1} duration={animateDuration} delay={animateDelay}>
      <BackButton onPress={onPressBack} disabled={disabled} />
    </PopInView>
  ) : (
    <BackButton onPress={onPressBack} disabled={disabled} />
  );

  const showCountdown = !isNaN(gameCountdown) && gameCountdown >= 0;

  return (
    <TopBarContainer>
      {BackButtonComponent}
      {showCountdown && (
        <Countdown
          gameCountdown={gameCountdown}
          animatingCountdown={animatingCountdown}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </TopBarContainer>
  );
};

TopBar.defaultProps = {
  animatingCountdown: false,
  onAnimationEnd: () => {},
  disabled: false,
};

export default TopBar;
