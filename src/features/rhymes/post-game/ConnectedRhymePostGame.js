import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame } from "../redux/rhymes-actions";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";

const mapStateToProps = ({ rhymes, eloTracking }) => {
  const { rhymesELO } = eloTracking;
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
  showLeaderboard,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
