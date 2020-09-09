import React from "react";
import { connect } from "react-redux";
import { fetchDefinitionsRetry, onExitGame } from "../redux/definitions-actions";
import { onNavigateBack } from "../../../redux/navigation/navigation-actions";
import DefintionGameMode from "./DefinitionGameMode";
import { ErrorScreen, LoadingScreen } from "../../../components";

const mapStateToProps = ({ definitions }) => {
  const { gameState, loaded, connectionError, errorCode, currentDefinition } = definitions;
  const { word: currentWord } = currentDefinition;

  return { gameState, currentWord, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchDefinitionsRetry,
  onNavigateBack,
  onExitGame,
};

const DefintionGameModeLoader = (props) => {
  const getContent = () => {
    if (props.connectionError) {
      return (
        <ErrorScreen
          onButtonPress={props.fetchDefinitionsRetry}
          errorCode={props.errorCode}
          onPressBack={props.onNavigateBack}
        />
      );
    }

    if (props.loaded && props.currentWord) {
      return (
        <DefintionGameMode
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

const ConnectedDefintionGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefintionGameModeLoader);

export default ConnectedDefintionGameMode;
