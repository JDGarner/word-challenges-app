import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame } from "../redux/rhymes-actions";
import { changeScreen } from "../../../redux/app-actions";

const mapStateToProps = ({ rhymes }) => {
  return {
    score: rhymes.score,
    totalRhymes: rhymes.currentRhymes.length,
    word: rhymes.currentWord,
  };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  changeScreen,
};

const ConnectedRhymePostGame = connect(mapStateToProps, mapDispatchToProps)(RhymePostGame);

export default ConnectedRhymePostGame;
