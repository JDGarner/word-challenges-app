import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import theme from "../../theme";
import { changeScreen } from "../../redux/app-actions";
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

const mapDispatchToProps = {
  changeScreen,
};

const ConnectedLoadingScreen = connect(null, mapDispatchToProps)(LoadingScreen);

export default ConnectedLoadingScreen;
