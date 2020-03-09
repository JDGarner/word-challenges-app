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

const TopBar = ({ gameCountdown, onPressExitGame, animateDuration, animateDelay, disabled }) => {
  const CloseComponent = animateDuration ? (
    <PopInView pointerEvents="auto" popToSize={1} duration={animateDuration} delay={animateDelay}>
      <BackButton onPress={onPressExitGame} disabled={disabled} />
    </PopInView>
  ) : (
    <BackButton onPress={onPressExitGame} disabled={disabled} />
  );

  return (
    <TopBarContainer>
      {CloseComponent}
      {!isNaN(gameCountdown) && gameCountdown >= 0 && <Countdown gameCountdown={gameCountdown} />}
    </TopBarContainer>
  );
};

TopBar.defaultProps = {
  disabled: false,
};

export default TopBar;
