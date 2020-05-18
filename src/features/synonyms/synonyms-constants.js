import { DIFFICULTIES } from "../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

export const GAME_STATES = {
  PLAYING: "Playing",
  POSTGAME: "PostGame",
};

export const WORDS_PER_ROUND = 3;
export const ANSWERS_REQUIRED = 3;

export const NUM_OF_FAKE_ANSWERS = {
  [NOVICE]: 8 - ANSWERS_REQUIRED,
  [JOURNEYMAN]: 10 - ANSWERS_REQUIRED,
  [EXPERT]: 12 - ANSWERS_REQUIRED,
  [MASTER]: 14 - ANSWERS_REQUIRED,
};
