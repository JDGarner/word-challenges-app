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
  MiddleComponent,
  RightComponent,
  disabled,
}) => {
  const renderBackButton = () => {
    if (!onPressBack) {
      // Render hidden back button to keep spacing consistent
      return <BackButton disabled style={{ opacity: 0 }} />;
    }

    if (animateDuration) {
      return (
        <PopInView
          pointerEvents="auto"
          popToSize={1}
          duration={animateDuration}
          delay={animateDelay}>
          <BackButton onPress={onPressBack} disabled={disabled} />
        </PopInView>
      );
    }

    return <BackButton onPress={onPressBack} disabled={disabled} />;
  };

  const showCountdown = !isNaN(gameCountdown) && gameCountdown >= 0;

  return (
    <TopBarContainer>
      {renderBackButton()}
      {MiddleComponent}
      {RightComponent}
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
  MiddleComponent: null,
  RightComponent: null,
  disabled: false,
};

export default TopBar;
