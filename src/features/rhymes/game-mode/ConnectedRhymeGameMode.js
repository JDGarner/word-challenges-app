import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { fetchRhymesRetry } from "../redux/rhymes-actions";
import RhymeGameMode from "./RhymeGameMode";
import { LoadingScreen, ErrorScreen } from "../../../components";

const mapStateToProps = ({ rhymes }) => {
  const { gameState, loaded, connectionError, errorCode } = rhymes;

  return { gameState, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchRhymesRetry,
};

const RhymeGameModeLoader = props => {
  const getContent = () => {
    if (props.connectionError) {
      return <ErrorScreen onButtonPress={props.fetchRhymesRetry} errorCode={props.errorCode} />;
    }

    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <RhymeGameMode gameState={props.gameState} />;
  };

  return <View style={{ flex: 1 }}>{getContent()}</View>;
};

const ConnectedRhymeGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RhymeGameModeLoader);

export default ConnectedRhymeGameMode;
