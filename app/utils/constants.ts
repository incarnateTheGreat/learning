const TEAMS = {
  1: {
    code: 3,
    id: 1,
    name: "Arsenal",
    short_name: "ARS",
    pulse_id: 1,
  },
  2: {
    code: 7,
    id: 2,
    name: "Aston Villa",
    short_name: "AVL",
    pulse_id: 2,
  },
  3: {
    code: 91,
    id: 3,
    name: "Bournemouth",
    short_name: "BOU",
    pulse_id: 127,
  },
  4: {
    code: 94,
    id: 4,
    name: "Brentford",
    short_name: "BRE",
    pulse_id: 130,
  },
  5: {
    code: 36,
    id: 5,
    name: "Brighton",
    short_name: "BHA",
    pulse_id: 131,
  },
  6: {
    code: 90,
    id: 6,
    name: "Burnley",
    short_name: "BUR",
    pulse_id: 43,
  },
  7: {
    code: 8,
    id: 7,
    name: "Chelsea",
    short_name: "CHE",
    pulse_id: 4,
  },
  8: {
    code: 31,
    id: 8,
    name: "Crystal Palace",
    short_name: "CRY",
    pulse_id: 6,
  },
  9: {
    code: 11,
    id: 9,
    name: "Everton",
    short_name: "EVE",
    pulse_id: 7,
  },
  10: {
    code: 54,
    id: 10,
    name: "Fulham",
    short_name: "FUL",
    pulse_id: 34,
  },
  11: {
    code: 14,
    id: 11,
    name: "Liverpool",
    short_name: "LIV",
    pulse_id: 10,
  },
  12: {
    code: 102,
    id: 12,
    name: "Luton",
    short_name: "LUT",
    pulse_id: 163,
  },
  13: {
    code: 43,
    id: 13,
    name: "Man City",
    short_name: "MCI",
    pulse_id: 11,
  },
  14: {
    code: 1,
    id: 14,
    name: "Man Utd",
    short_name: "MUN",
    pulse_id: 12,
  },
  15: {
    code: 4,
    id: 15,
    name: "Newcastle",
    short_name: "NEW",
    pulse_id: 23,
  },
  16: {
    code: 17,
    id: 16,
    name: "Nott'm Forest",
    short_name: "NFO",
    pulse_id: 15,
  },
  17: {
    code: 49,
    id: 17,
    name: "Sheffield Utd",
    short_name: "SHU",
    pulse_id: 18,
  },
  18: {
    code: 6,
    id: 18,
    name: "Spurs",
    short_name: "TOT",
    pulse_id: 21,
  },
  19: {
    code: 21,
    id: 19,
    name: "West Ham",
    short_name: "WHU",
    pulse_id: 25,
  },
  20: {
    code: 39,
    id: 20,
    name: "Wolves",
    short_name: "WOL",
    pulse_id: 38,
  },
};

const POSITIONS = {
  "1": "Goalkeepers",
  "2": "Defenders",
  "3": "Midfielders",
  "4": "Forwards",
};

const LINKS = [
  {
    name: "Analyze",
    link: "analyze",
  },
  {
    name: "Scores",
    link: "scores",
  },
  {
    name: "Settings",
    link: "settings",
  },
];

const NAV_CLASSES =
  "text-foreground/60 transition-colors hover:text-foreground/80";

export { LINKS,NAV_CLASSES, POSITIONS, TEAMS };
