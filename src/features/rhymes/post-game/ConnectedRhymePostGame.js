import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame, onExitGame } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes, leaderboards }) => {
  const { rhymesELO } = leaderboards;
  const { currentWord, correctAnswers, eloChange } = rhymes;

  return {
    word: currentWord.word,
    score: correctAnswers.length,
    correctAnswers,
    currentELO: rhymesELO,
    eloChange,
  };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  onExitGame,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
