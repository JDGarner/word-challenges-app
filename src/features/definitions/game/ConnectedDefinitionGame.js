import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
} from "../redux/definitions-actions";

const mapStateToProps = ({ definitions }) => {
  const {
    currentDefinition,
    currentDefinitions,
    currentDefinitionIndex,
    scrambledLetters,
    gameCountdown,
  } = definitions;
  const { definition } = currentDefinition;

  return {
    currentDefinitions,
    definition,
    currentDefinitionIndex,
    letters: scrambledLetters,
    gameCountdown,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
};

const ConnectedDefinitionGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionGame);

export default ConnectedDefinitionGame;
