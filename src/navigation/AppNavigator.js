import { createAppContainer, createStackNavigator } from "react-navigation";

import ConnectedRhymeGameMode from "../features/rhymes/game-mode/ConnectedRhymeGameMode";

const RhymeGameStack = createStackNavigator({
  RhymeGameMode: ConnectedRhymeGameMode,
});

export default createAppContainer(RhymeGameStack);
