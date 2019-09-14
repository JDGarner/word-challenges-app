import { createAppContainer, createStackNavigator } from "react-navigation";

import ConnectedRhymeGame from "../features/rhymes/game/ConnectedRhymeGame";

const RhymeGameStack = createStackNavigator({
  RhymeGame: ConnectedRhymeGame,
});

export default createAppContainer(RhymeGameStack);
