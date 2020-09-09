import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { fetchRhymesRetry, onExitGame } from "../redux/rhymes-actions";
import { onNavigateBack } from "../../../redux/navigation/navigation-actions";
import RhymeGameMode from "./RhymeGameMode";
import { LoadingScreen, ErrorScreen } from "../../../components";

const mapStateToProps = ({ rhymes }) => {
  const { gameState, loaded, connectionError, errorCode, currentWord } = rhymes;

  return { gameState, loaded, connectionError, errorCode, currentWord: currentWord.word };
};

const mapDispatchToProps = {
  fetchRhymesRetry,
  onExitGame,
  onNavigateBack,
};

const RhymeGameModeLoader = (props) => {
  const getContent = () => {
    if (props.connectionError) {
      return (
        <ErrorScreen
          onButtonPress={props.fetchRhymesRetry}
          errorCode={props.errorCode}
          onPressBack={props.onNavigateBack}
        />
      );
    }

    if (props.loaded && props.currentWord) {
      return <RhymeGameMode gameState={props.gameState} onExitGame={props.onExitGame} />;
    }

    return <LoadingScreen onPressBack={props.onNavigateBack} />;
  };

  return <View style={{ flex: 1 }}>{getContent()}</View>;
};

const ConnectedRhymeGameMode = connect(mapStateToProps, mapDispatchToProps)(RhymeGameModeLoader);

export default ConnectedRhymeGameMode;
