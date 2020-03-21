import { DIFFICULTIES } from "../../app-constants";

export const GAME_STATES = {
  DIFFICULTYSELECTION: "DifficultySelection",
  PLAYING: "Playing",
  POSTGAME: "PostGame",
};

export const WORD_DIFFICULTIES = {
  EASY: "easy",
  HARD: "hard",
};

export const DIFFICULTY_MAP = {
  [DIFFICULTIES.NOVICE]: WORD_DIFFICULTIES.EASY,
  [DIFFICULTIES.JOURNEYMAN]: WORD_DIFFICULTIES.EASY,
  [DIFFICULTIES.EXPERT]: WORD_DIFFICULTIES.HARD,
  [DIFFICULTIES.MASTER]: WORD_DIFFICULTIES.HARD,
};

export const DIFFICULTY_TO_INFO_MAP = {
  [DIFFICULTIES.NOVICE]: "Mostly common words, with some letters already filled in",
  [DIFFICULTIES.JOURNEYMAN]: "Mostly common words, no letters filled in",
  [DIFFICULTIES.EXPERT]: "Mostly obscure words, with some letters already filled in",
  [DIFFICULTIES.MASTER]: "Mostly obscure words, no letters filled in",
};

export const WORDS_PER_ROUND = 5;
export const INITIAL_COUNTDOWN = 20;
export const DEFINITIONS_LOCAL_BUFFER = 30;

export const SHUFFLE_ANIMATION_TIME = 200;
export const SHUFFLE_ANIMATION_STAGGER_TIME = 25;
export const SHUFFLE_ANIMATION_REAPPEAR_BUFFER = 50;

export const ANSWER_ANIMATION_GAP_TIME = 150;
export const ANSWER_ANIMATION_START_DELAY_TIME = 620;
export const ANSWER_ANIMATION_DURATION = 270;

export const ANSWER_FEEDBACK_ANIMATION_DURATION = 1000;
