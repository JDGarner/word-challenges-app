import React from "react";
import { connect } from "react-redux";
import { fetchSynonymsRetry, onExitGame } from "../redux/synonyms-actions";
import { onNavigateBack } from "../../../redux/navigation/navigation-actions";
import SynonymsGameMode from "./SynonymsGameMode";
import { ErrorScreen, LoadingScreen } from "../../../components";

const mapStateToProps = ({ synonyms }) => {
  const { gameState, loaded, connectionError, errorCode, currentSynonym } = synonyms;
  const { word: currentWord } = currentSynonym;

  return { gameState, currentWord, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchSynonymsRetry,
  onNavigateBack,
  onExitGame,
};

const SynonymsGameModeLoader = (props) => {
  const getContent = () => {
    if (props.connectionError) {
      return (
        <ErrorScreen
          onButtonPress={props.fetchSynonymsRetry}
          errorCode={props.errorCode}
          onPressBack={props.onNavigateBack}
        />
      );
    }

    if (props.loaded && props.currentWord) {
      return (
        <SynonymsGameMode
          currentWord={props.currentWord}
          gameState={props.gameState}
          onExitGame={props.onExitGame}
        />
      );
    }

    return <LoadingScreen onPressBack={props.onNavigateBack} />;
  };

  return getContent();
};

const ConnectedSynonymsGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SynonymsGameModeLoader);

export default ConnectedSynonymsGameMode;
