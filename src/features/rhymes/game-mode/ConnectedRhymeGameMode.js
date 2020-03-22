import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { fetchRhymesRetry, goBackToDifficultySelection } from "../redux/rhymes-actions";
import RhymeGameMode from "./RhymeGameMode";
import { LoadingScreen, ErrorScreen, ScreenContainerPadded } from "../../../components";
import { GAME_STATES } from "../rhymes-constants";
import ConnectedRhymeDifficultySelection from "../difficulty-selection/ConnectedRhymeDifficultySelection";

const mapStateToProps = ({ rhymes }) => {
  const { gameState, loaded, connectionError, errorCode, currentWord } = rhymes;

  return { gameState, loaded, connectionError, errorCode, currentWord };
};

const mapDispatchToProps = {
  fetchRhymesRetry,
  goBackToDifficultySelection,
};

const RhymeGameModeLoader = props => {
  const getContent = () => {
    if (props.gameState === GAME_STATES.DIFFICULTYSELECTION) {
      return (
        <ScreenContainerPadded>
          <ConnectedRhymeDifficultySelection />
        </ScreenContainerPadded>
      );
    }

    if (props.connectionError) {
      return (
        <ErrorScreen
          onButtonPress={props.fetchRhymesRetry}
          errorCode={props.errorCode}
          onPressBack={props.goBackToDifficultySelection}
        />
      );
    }

    if (props.loaded && props.currentWord) {
      return <RhymeGameMode gameState={props.gameState} />;
    }

    return <LoadingScreen onPressBack={props.goBackToDifficultySelection} />;
  };

  return <View style={{ flex: 1 }}>{getContent()}</View>;
};

const ConnectedRhymeGameMode = connect(mapStateToProps, mapDispatchToProps)(RhymeGameModeLoader);

export default ConnectedRhymeGameMode;
