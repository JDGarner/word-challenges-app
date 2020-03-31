import React, { useState } from "react";
import { View, Switch } from "react-native";
import styled from "styled-components";
import { ScreenContainerPadded, TopBar, TextContainer, MediumLargeText } from "../../components";
import { SCREENS } from "../../app-constants";
import SoundManager from "../sound/SoundManager";
import colors from "../../theme/colors";

const SettingsContainer = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

const SettingsRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8;
  padding-horizontal: 8;
`;

const Settings = ({ changeScreen }) => {
  const soundManager = SoundManager.getInstance();
  const [muted, setMuted] = useState(soundManager.isMuted());

  const toggleMuted = () => {
    soundManager.toggleMute();
    setMuted(!muted);
  };

  const soundText = muted ? "Sound Disabled" : "Sound Enabled";

  return (
    <ScreenContainerPadded>
      <TopBar onPressLeftButton={() => changeScreen(SCREENS.MENU)} />
      <SettingsContainer>
        <SettingsRow>
          <MediumLargeText>{soundText}</MediumLargeText>
          <Switch
            trackColor={{ false: colors.switchTrackColor, true: colors.switchTrackColor }}
            ios_backgroundColor={colors.switchTrackColor}
            thumbColor={colors.textColor}
            onValueChange={toggleMuted}
            value={!muted}
          />
        </SettingsRow>
      </SettingsContainer>
    </ScreenContainerPadded>
  );
};

export default Settings;
