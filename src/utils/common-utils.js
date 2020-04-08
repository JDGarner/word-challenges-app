import { sample } from "lodash";

export const getHighestPraiseWord = () => {
  if (Math.random() < 0.05) {
    return sample(["Godlike!"]);
  }

  return sample(["Superb!", "Wunderbar!", "Perfect!"]);
};

export const getHighPraiseWord = () => {
  return sample(["Super!", "Impressive!", "Muy Bien!"]);
};

export const getMediumPraiseWord = () => {
  return sample(["Good Effort!", "Not Bad!", "Good Try!"]);
};

export const getLowPraiseWord = () => {
  return "Better Luck Next Round!";
};
