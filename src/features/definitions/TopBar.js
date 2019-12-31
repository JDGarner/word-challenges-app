import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { CloseButton } from "../../components/button/Button";
import { Countdown } from "../../components";
import PopInView from "../../components/pop-in-view/PopInView";

const TopBarContainer = styled(View)`
  height: 8%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 42;
  margin-bottom: auto;
`;

const TopBar = ({ gameCountdown, onPressExitGame, animateDuration, animateDelay }) => {
  const CloseComponent = animateDuration ? (
    <PopInView pointerEvents="auto" popToSize={1} duration={animateDuration} delay={animateDelay}>
      <CloseButton onPress={onPressExitGame} />
    </PopInView>
  ) : (
    <CloseButton onPress={onPressExitGame} />
  );

  return (
    <TopBarContainer>
      {CloseComponent}
      {gameCountdown && <Countdown gameCountdown={gameCountdown} />}
    </TopBarContainer>
  );
};

export default TopBar;
