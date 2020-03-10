import { connect } from "react-redux";
import RhymeGame from "./RhymeGame";
import {
  onSubmitAnswer,
  onBeginGame,
  onGameEnd,
  onCountdownAnimationEnd,
} from "../redux/rhymes-actions";
import { changeScreen } from "../../../redux/app-actions";

const mapStateToProps = ({ rhymes }) => {
  const { currentWord, currentRhymes, correctAnswers, gameCountdown, animatingCountdown } = rhymes;

  return {
    currentWord,
    currentRhymes,
    correctAnswers,
    gameCountdown,
    animatingCountdown,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onCountdownAnimationEnd,
  changeScreen,
};

const ConnectedRhymeGame = connect(mapStateToProps, mapDispatchToProps)(RhymeGame);

export default ConnectedRhymeGame;
