import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame } from "../redux/rhymes-actions";
import { showLeaderboard } from "../../../redux/google-play/google-play-services-actions";

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
  showLeaderboard,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
