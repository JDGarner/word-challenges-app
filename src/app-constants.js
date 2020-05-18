import { Platform } from "react-native";

export const ENDPOINTS = {
  RHYMES: "rhymes",
  RHYMES_ELO: "rhymes-elo",
  DEFINITIONS: "definitions",
  DEFINITIONS_ELO: "definitions-elo",
  SYNONYMS: "synonyms",
  SYNONYMS_ELO: "synonyms-elo",
};

export const SCREENS = {
  MENU: "Menu",
  INFO: "Info",
  DEFINITIONS: "Definitions",
  DEFINITIONS_DIFFICULTY: "DefinitionsDifficulty",
  RHYMES: "Rhymes",
  RHYMES_DIFFICULTY: "RhymesDifficulty",
  SYNONYMS: "Synonyms",
  SYNONYMS_DIFFICULTY: "SynonymsDifficulty",
};

export const DIFFICULTIES = {
  NOVICE: "novice",
  JOURNEYMAN: "journeyman",
  EXPERT: "expert",
  MASTER: "master",
};

export const APP_STORAGE = {
  MUTED: "app_muted",
  DEFINITIONS_ELO: "definitions_elo",
  RHYMES_ELO: "rhymes_elo",
  SYNONYMS_ELO: "synonyms_elo",
};

export const MODES = {
  DEFINITIONS: "definitions",
  RHYMES: "rhymes",
  SYNONYMS: "synonyms",
};

const ANDROID_LEADERBOARD_IDS = {
  DEFINITIONS: "CgkIu9P2ttwGEAIQAQ",
  RHYMES: "CgkIu9P2ttwGEAIQAg",
};

const IOS_LEADERBOARD_IDS = {
  DEFINITIONS: "grp.definitions",
  RHYMES: "grp.rhymes",
  SYNONYMS: "grp.synonyms",
};

export const LEADERBOARD_IDS =
  Platform.OS === "android" ? ANDROID_LEADERBOARD_IDS : IOS_LEADERBOARD_IDS;

export const INITIAL_ELO = 800;
export const RETRY_TIMEOUT = 1000;
