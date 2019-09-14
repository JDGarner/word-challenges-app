import { connect } from "react-redux";
import RhymeGame from "./RhymeGame";
import { onSubmitAnswer, onBeginGame, onGameEnd } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  const { currentWord, currentRhymes, correctAnswers, gameCountdown } = rhymes;

  return {
    currentWord,
    currentRhymes,
    correctAnswers,
    gameCountdown,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
};

const ConnectedRhymeGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RhymeGame);

export default ConnectedRhymeGame;
