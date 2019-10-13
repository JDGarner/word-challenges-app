import React from "react";
import { connect } from "react-redux";
import { fetchDefinitionsRetry } from "../redux/definitions-actions";
import AppBackground from "../../../components/background/AppBackground";
import DefintionGameMode from "./DefinitionGameMode";
import { ErrorScreen, LoadingScreen } from "../../../components";

const mapStateToProps = ({ definitions }) => {
  const { gameState, loaded, connectionError, errorCode } = definitions;

  return { gameState, loaded, connectionError, errorCode };
};

const mapDispatchToProps = {
  fetchDefinitionsRetry,
};

const DefintionGameModeLoader = props => {
  const getContent = () => {
    if (props.connectionError) {
      return (
        <ErrorScreen onButtonPress={props.fetchDefinitionsRetry} errorCode={props.errorCode} />
      );
    }

    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <DefintionGameMode gameState={props.gameState} />;
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedDefintionGameMode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefintionGameModeLoader);

ConnectedDefintionGameMode.navigationOptions = {
  header: null,
};

export default ConnectedDefintionGameMode;
