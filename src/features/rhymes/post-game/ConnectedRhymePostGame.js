import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  return {
    score: rhymes.score,
  };
};

const mapDispatchToProps = {
  onPressStartNewGame,
};

const ConnectedRhymePostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RhymePostGame);

export default ConnectedRhymePostGame;
