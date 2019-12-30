import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { CloseButton } from "../../components/button/Button";
import { Countdown } from "../../components";

const TopBarContainer = styled(View)`
  height: 8%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 42;
  margin-bottom: auto;
`;

const TopBar = ({ gameCountdown, onPressExitGame }) => {
  return (
    <TopBarContainer>
      <CloseButton onPress={onPressExitGame} />
      {gameCountdown && <Countdown gameCountdown={gameCountdown} />}
    </TopBarContainer>
  );
};

export default TopBar;
