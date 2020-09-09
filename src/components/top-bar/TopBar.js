import React from "react";
import styled from "styled-components";
import { View, Image } from "react-native";
import { IconButton } from "../../components/button/Button";
import Countdown from "../countdown/Countdown";
import TopBarTitle from "../title/TopBarTitle";
import SoundManager from "../../features/sound/SoundManager";
import { getSizingForOptions } from "../../utils/sizing-utils";

const TOP_BAR_HEIGHT = getSizingForOptions(52, 70, 70, 120);
const IMAGE_SIZE = getSizingForOptions(52, 58, 58, 96);

const TopBarContainer = styled(View)`
  height: ${(props) => props.height || TOP_BAR_HEIGHT};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
`;

const imageStyles = { width: IMAGE_SIZE, height: IMAGE_SIZE, opacity: 0.8, marginTop: 4 };

const TopBar = ({
  gameCountdown,
  onPressLeftButton,
  animatingCountdown,
  onAnimationEnd,
  titleText,
  displayLogo,
  LeftComponent,
  RightComponent,
  disabled,
}) => {
  const handlePressBackButton = () => {
    SoundManager.getInstance().playMenuNegativeButtonSound();
    onPressLeftButton();
  };

  const renderLeftButton = () => {
    if (LeftComponent) {
      return LeftComponent;
    }

    return <IconButton name="arrow-back" onPress={handlePressBackButton} disabled={disabled} />;
  };

  const showCountdown = !isNaN(gameCountdown) && gameCountdown >= 0;

  return (
    <TopBarContainer>
      {renderLeftButton()}
      {titleText && <TopBarTitle>{titleText}</TopBarTitle>}
      {displayLogo && <Image style={imageStyles} source={require("../../assets/menuimage.png")} />}
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
  onPressLeftButton: () => {},
  titleText: null,
  LeftComponent: null,
  RightComponent: null,
  disabled: false,
};

export default TopBar;
