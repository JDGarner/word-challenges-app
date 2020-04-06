import { sample } from "lodash";

export const getHighestPraiseWord = () => {
  return sample([
    "Phenomenal!",
    "Terrific!",
    "Tremendous!",
    "Magnificent!",
    "Sublime!",
    "Monumental!",
    "Wunderbar!",
    "Perfect!",
  ]);
};

export const getHighPraiseWord = () => {
  return sample(["Super!", "Impressive!", "Muy Bien!", "Superb!"]);
};

export const getMediumPraiseWord = () => {
  return sample(["Good Effort!", "Not Bad!", "Good Try!"]);
};

export const getLowPraiseWord = () => {
  return "Better Luck Next Round!";
};
