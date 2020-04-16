import React from "react";
import { ActivityIndicator, View } from "react-native";
import theme from "../../theme";
import { ScreenContainerPadded } from "../containers/Containers";
import TopBar from "../top-bar/TopBar";

const LoadingScreen = ({ onPressBack }) => {
  return (
    <ScreenContainerPadded>
      <TopBar onPressLeftButton={onPressBack} />
      <View style={{ flex: 1, marginBottom: 70, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </View>
    </ScreenContainerPadded>
  );
};

export default LoadingScreen;
