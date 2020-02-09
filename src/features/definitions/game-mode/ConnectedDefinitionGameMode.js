import React from "react";
import { connect } from "react-redux";
import { fetchDefinitionsRetry } from "../redux/definitions-actions";
import AppBackground from "../../../components/background/AppBackground";
import { ScreenContainerPadded } from "../../../components/containers/Containers";
import DefintionGameMode from "./DefinitionGameMode";
import { ErrorScreen, LoadingScreen } from "../../../components";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionDifficultySelection from "../difficulty-selection/ConnectedDefinitionDifficultySelection";

const mapStateToProps = ({ definitions }) => {
  const { gameState, loaded, connectionError, errorCode, currentDefinition } = definitions;
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
          <ConnectedDefinitionDifficultySelection navigation={props.navigation} />
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

    return (
      <DefintionGameMode
        currentWord={props.currentWord}
        gameState={props.gameState}
        navigation={props.navigation}
      />
    );
  };

  return <AppBackground theme="definitions">{getContent()}</AppBackground>;
};

const ConnectedDefintionGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefintionGameModeLoader);

ConnectedDefintionGameMode.navigationOptions = {
  header: null,
};

export default ConnectedDefintionGameMode;
