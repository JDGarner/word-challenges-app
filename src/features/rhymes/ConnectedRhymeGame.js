import React from "react";
import { connect } from "react-redux";
import RhymeGame from "./RhymeGame";
import LoadingScreen from "../../components/loading/LoadingScreen";
import AppBackground from "../../components/background/AppBackground";
import { onSubmitAnswer, onBeginGame } from "../../redux/actions";

const mapStateToProps = ({ rhymes }) => {
  const { currentWord, currentRhymes, correctAnswers, gameCountdown, loaded } = rhymes;

  return {
    currentWord,
    currentRhymes,
    correctAnswers,
    gameCountdown,
    loaded,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onSubmitAnswer,
};

const RhymeGameLoader = props => {
  const getContent = () => {
    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return (
      <RhymeGame
        currentWord={props.currentWord}
        currentRhymes={props.currentRhymes}
        correctAnswers={props.correctAnswers}
        gameCountdown={props.gameCountdown}
        onBeginGame={props.onBeginGame}
        onSubmitAnswer={props.onSubmitAnswer}
      />
    );
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedRhymeGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RhymeGameLoader);

ConnectedRhymeGame.navigationOptions = {
  header: null,
};

export default ConnectedRhymeGame;
