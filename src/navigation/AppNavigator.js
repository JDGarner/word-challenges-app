import { createAppContainer, createStackNavigator } from "react-navigation";

import ConnectedRhymeGame from "../features/rhymes/ConnectedRhymeGame";

const RhymeGameStack = createStackNavigator({
  RhymeGame: ConnectedRhymeGame,
});

export default createAppContainer(RhymeGameStack);
