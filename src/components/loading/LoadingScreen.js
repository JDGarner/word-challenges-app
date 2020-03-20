import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ActivityIndicator, View } from "react-native";
import theme from "../../theme";
import { changeScreen } from "../../redux/app-actions";
import { TopBar, ScreenContainerPadded } from "..";
import { SCREENS } from "../../app-constants";

const LoadingScreen = ({ changeScreen }) => {
  return (
    <ScreenContainerPadded>
      <TopBar onPressBack={() => changeScreen(SCREENS.MENU)} />
      <View style={{ flex: 1, marginBottom: 70, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </View>
    </ScreenContainerPadded>
  );
};

const mapDispatchToProps = {
  changeScreen,
};

const ConnectedLoadingScreen = connect(null, mapDispatchToProps)(LoadingScreen);

export default ConnectedLoadingScreen;
