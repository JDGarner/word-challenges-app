import React from "react";
import { connect } from "react-redux";
import { fetchRhymesRetry } from "../redux/rhymes-actions";
import AppBackground from "../../../components/background/AppBackground";
import RhymeGameMode from "./RhymeGameMode";
import { LoadingScreen, ErrorScreen } from "../../../components";

const mapStateToProps = ({ rhymes }) => {
  const { gameState, loaded, connectionError } = rhymes;

  return { gameState, loaded, connectionError };
};

const mapDispatchToProps = {
  fetchRhymesRetry,
};

const RhymeGameModeLoader = props => {
  const getContent = () => {
    if (props.connectionError) {
      return <ErrorScreen onButtonPress={props.fetchRhymesRetry} />;
    }

    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <RhymeGameMode gameState={props.gameState} />;
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedRhymeGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RhymeGameModeLoader);

ConnectedRhymeGameMode.navigationOptions = {
  header: null,
};

export default ConnectedRhymeGameMode;
