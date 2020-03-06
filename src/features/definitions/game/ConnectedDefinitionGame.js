import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onExitGame,
  onGameCountdownAtZero,
} from "../redux/definitions-actions";
import { changeScreen } from "../../../redux/app-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { gameCountdown, difficulty } = definitions;
  const { currentDefinition } = getDefinitionState(definitions);
  const { definition, word } = currentDefinition;

  return {
    word,
    definition,
    gameCountdown,
    difficulty,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onExitGame,
  changeScreen,
  onGameCountdownAtZero,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
