import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame, onExitGame } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  const { currentWord, correctAnswers } = rhymes;

  return {
    word: currentWord,
    score: correctAnswers.length,
    correctAnswers,
  };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  onExitGame,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
