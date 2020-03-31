import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { IconButton } from "../../components/button/Button";
import Countdown from "../countdown/Countdown";
import TopBarTitle from "../title/TopBarTitle";

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
  onPressLeftButton,
  animatingCountdown,
  onAnimationEnd,
  titleText,
  LeftComponent,
  RightComponent,
  disabled,
}) => {
  const renderLeftButton = () => {
    if (LeftComponent) {
      return LeftComponent;
    }

    return <IconButton name="arrow-back" onPress={onPressLeftButton} disabled={disabled} />;
  };

  const showCountdown = !isNaN(gameCountdown) && gameCountdown >= 0;

  return (
    <TopBarContainer>
      {renderLeftButton()}
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
  LeftComponent: null,
  RightComponent: null,
  disabled: false,
};

export default TopBar;
