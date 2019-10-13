import { createAppContainer, createStackNavigator } from "react-navigation";

import MainMenu from "../features/main-menu/MainMenu";
import ConnectedRhymeGameMode from "../features/rhymes/game-mode/ConnectedRhymeGameMode";
import ConnectedDefinitionGameMode from "../features/definitions/game-mode/ConnectedDefinitionGameMode";

const WordGameStack = createStackNavigator(
  {
    MainMenu,
    DefinitionGame: ConnectedDefinitionGameMode,
    RhymeGame: ConnectedRhymeGameMode,
  },
  {
    initialRouteName: "MainMenu",
  },
);

export default createAppContainer(WordGameStack);
