import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "../../../components/loading/LoadingScreen";
import AppBackground from "../../../components/background/AppBackground";
import RhymeGameMode from "./RhymeGameMode";

const mapStateToProps = ({ rhymes }) => {
  const { gameState, loaded } = rhymes;

  return { gameState, loaded };
};

const RhymeGameModeLoader = props => {
  const getContent = () => {
    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <RhymeGameMode gameState={props.gameState} />;
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedRhymeGameMode = connect(mapStateToProps)(RhymeGameModeLoader);

ConnectedRhymeGameMode.navigationOptions = {
  header: null,
};

export default ConnectedRhymeGameMode;
