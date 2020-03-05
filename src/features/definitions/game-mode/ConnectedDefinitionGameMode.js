import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { fetchDefinitionsRetry } from "../redux/definitions-actions";
import { ScreenContainerPadded } from "../../../components/containers/Containers";
import DefintionGameMode from "./DefinitionGameMode";
import { ErrorScreen, LoadingScreen } from "../../../components";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionDifficultySelection from "../difficulty-selection/ConnectedDefinitionDifficultySelection";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { gameState, loaded, connectionError, errorCode } = definitions;
  const { currentDefinition } = getDefinitionState(definitions);

  const { word: currentWord } = currentDefinition;

  return { gameState, currentWord, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchDefinitionsRetry,
};

const DefintionGameModeLoader = props => {
  const getContent = () => {
    if (props.gameState === GAME_STATES.DIFFICULTYSELECTION) {
      return (
        <ScreenContainerPadded>
          <ConnectedDefinitionDifficultySelection />
        </ScreenContainerPadded>
      );
    }

    if (props.connectionError) {
      return (
        <ErrorScreen onButtonPress={props.fetchDefinitionsRetry} errorCode={props.errorCode} />
      );
    }

    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <DefintionGameMode currentWord={props.currentWord} gameState={props.gameState} />;
  };

  return <View style={{ flex: 1 }}>{getContent()}</View>;
};

const ConnectedDefintionGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefintionGameModeLoader);

export default ConnectedDefintionGameMode;
