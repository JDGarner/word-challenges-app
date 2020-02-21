import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onShuffleCurrentWord,
  onExitGame,
} from "../redux/definitions-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { gameCountdown, difficulty } = definitions;
  const { currentDefinition, scrambledLetters } = getDefinitionState(definitions);
  const { definition, word } = currentDefinition;

  return {
    word,
    definition,
    letters: scrambledLetters,
    gameCountdown,
    difficulty,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onShuffleCurrentWord,
  onExitGame,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
