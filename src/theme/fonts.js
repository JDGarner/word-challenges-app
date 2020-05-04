import { SCREEN_SIZE, SMALL, MEDIUM, LARGE } from "../utils/sizing-utils";

const LARGER_OPTIONS = {
  [SMALL]: 36,
  [MEDIUM]: 42,
  [LARGE]: 48,
};

const LARGE_OPTIONS = {
  [SMALL]: 28,
  [MEDIUM]: 32,
  [LARGE]: 36,
};

const MEDIUMLARGER_OPTIONS = {
  [SMALL]: 20,
  [MEDIUM]: 24,
  [LARGE]: 28,
};

const MEDIUMLARGE_OPTIONS = {
  [SMALL]: 20,
  [MEDIUM]: 22,
  [LARGE]: 24,
};

const MEDIUM_OPTIONS = {
  [SMALL]: 17,
  [MEDIUM]: 18,
  [LARGE]: 20,
};

const SMALLMEDIUM_OPTIONS = {
  [SMALL]: 14,
  [MEDIUM]: 14,
  [LARGE]: 16,
};

const SMALL_OPTIONS = {
  [SMALL]: 12,
  [MEDIUM]: 13,
  [LARGE]: 14,
};

const LARGER_FONTSIZE = LARGER_OPTIONS[SCREEN_SIZE];
const LARGE_FONTSIZE = LARGE_OPTIONS[SCREEN_SIZE];
const MEDIUMLARGER_FONTSIZE = MEDIUMLARGER_OPTIONS[SCREEN_SIZE];
const MEDIUMLARGE_FONTSIZE = MEDIUMLARGE_OPTIONS[SCREEN_SIZE];
const MEDIUM_FONTSIZE = MEDIUM_OPTIONS[SCREEN_SIZE];
const SMALLMEDIUM_FONTSIZE = SMALLMEDIUM_OPTIONS[SCREEN_SIZE];
const SMALL_FONTSIZE = SMALL_OPTIONS[SCREEN_SIZE];

export default {
  larger: {
    fontSize: LARGER_FONTSIZE,
    fontWeight: "400",
  },
  large: {
    fontSize: LARGE_FONTSIZE,
    fontWeight: "400",
  },
  mediumlarger: {
    fontSize: MEDIUMLARGER_FONTSIZE,
    fontWeight: "400",
  },
  mediumlarge: {
    fontSize: MEDIUMLARGE_FONTSIZE,
    fontWeight: "400",
  },
  medium: {
    fontSize: MEDIUM_FONTSIZE,
    fontWeight: "400",
  },
  smallmedium: {
    fontSize: SMALLMEDIUM_FONTSIZE,
    fontWeight: "400",
  },
  small: {
    fontSize: SMALL_FONTSIZE,
    fontWeight: "400",
  },
};
