import { connect } from "react-redux";
import RhymeGame from "./RhymeGame";
import {
  onSubmitAnswer,
  onBeginGame,
  onGameEnd,
  onCountdownAnimationEnd,
  onGameFadeOutEnd,
} from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  const {
    currentWord,
    correctAnswers,
    gameCountdown,
    animatingCountdown,
    incorrectAnswerAnimationToggle,
  } = rhymes;

  return {
    currentWord: currentWord.word,
    correctAnswers,
    gameCountdown,
    animatingCountdown,
    incorrectAnswerAnimationToggle,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onCountdownAnimationEnd,
  onGameFadeOutEnd,
};

const ConnectedRhymeGame = connect(mapStateToProps, mapDispatchToProps)(RhymeGame);

export default ConnectedRhymeGame;
