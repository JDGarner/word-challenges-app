import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { BackButton } from "../../components/button/Button";
import Countdown from "../countdown/Countdown";
import TopBarTitle from "../title/TopBarTitle";
import { LargeText } from "../text/Text";

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
  animatingCountdown,
  onAnimationEnd,
  titleText,
  RightComponent,
  disabled,
}) => {
  const renderBackButton = () => {
    if (!onPressBack) {
      // Render hidden back button to keep spacing consistent
      return <BackButton disabled style={{ opacity: 0 }} />;
    }

    return <BackButton onPress={onPressBack} disabled={disabled} />;
  };

  const showCountdown = !isNaN(gameCountdown) && gameCountdown >= 0;

  return (
    <TopBarContainer>
      {renderBackButton()}
      {titleText && <TopBarTitle>{titleText}</TopBarTitle>}
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
  titleText: null,
  RightComponent: null,
  disabled: false,
};

export default TopBar;
