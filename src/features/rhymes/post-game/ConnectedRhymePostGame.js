import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame, onExitGame } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  return {
    score: rhymes.score,
    totalRhymes: rhymes.currentRhymes.length,
    word: rhymes.currentWord,
  };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  onExitGame,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
