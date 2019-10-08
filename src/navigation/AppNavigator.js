import { createAppContainer, createStackNavigator } from "react-navigation";

import ConnectedRhymeGameMode from "../features/rhymes/game-mode/ConnectedRhymeGameMode";
// import ConnectedDefinitionGameMode from "../features/defintions/game-mode/ConnectedDefinitionGameMode";

const WordGameStack = createStackNavigator({
  // DefinitionGameMode: ConnectedDefinitionGameMode,
  RhymeGameMode: ConnectedRhymeGameMode,
});

export default createAppContainer(WordGameStack);
