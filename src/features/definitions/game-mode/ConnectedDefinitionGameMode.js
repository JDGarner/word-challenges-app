import React from "react";
import { connect } from "react-redux";
import { fetchDefinitionsRetry, goBackToDifficultySelection } from "../redux/definitions-actions";
import DefintionGameMode from "./DefinitionGameMode";
import { ErrorScreen, LoadingScreen, ScreenContainerPadded } from "../../../components";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionDifficultySelection from "../difficulty-selection/ConnectedDefinitionDifficultySelection";
import { getDefinitionState } from "../definitions-utils";
import { LEADERBOARD_IDS } from "../../../app-constants";

const mapStateToProps = ({ definitions }) => {
  const { gameState, loaded, connectionError, errorCode } = definitions;
  const { currentDefinition } = getDefinitionState(definitions);

  const { word: currentWord } = currentDefinition;

  return { gameState, currentWord, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchDefinitionsRetry,
  goBackToDifficultySelection,
};

const DefintionGameModeLoader = props => {
  const getContent = () => {
    if (props.gameState === GAME_STATES.DIFFICULTYSELECTION) {
      return (
        <ScreenContainerPadded>
          <ConnectedDefinitionDifficultySelection
            titleText="DEFINITIONS"
            leaderboardId={LEADERBOARD_IDS.DEFINITIONS}
          />
        </ScreenContainerPadded>
      );
    }

    if (props.connectionError) {
      return (
        <ErrorScreen
          onButtonPress={props.fetchDefinitionsRetry}
          errorCode={props.errorCode}
          onPressBack={props.goBackToDifficultySelection}
        />
      );
    }

    if (props.loaded && props.currentWord) {
      return <DefintionGameMode currentWord={props.currentWord} gameState={props.gameState} />;
    }

    return <LoadingScreen onPressBack={props.goBackToDifficultySelection} />;
  };

  return getContent();
};

const ConnectedDefintionGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefintionGameModeLoader);

export default ConnectedDefintionGameMode;
