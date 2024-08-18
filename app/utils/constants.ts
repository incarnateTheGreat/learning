// Get "teams" object from https://fantasy.premierleague.com/api/bootstrap-static/ and run this script:

// const teams = teamsData.reduce((acc, team) => {
//   const {code, id, name, short_name, pulse_id} = team;

//   acc[id] = {
//       id, name, short_name, pulse_id
//   }

//   return acc
// }, {})

const TEAMS = {
  1: { id: 1, name: "Arsenal", short_name: "ARS", pulse_id: 1 },
  2: { id: 2, name: "Aston Villa", short_name: "AVL", pulse_id: 2 },
  3: { id: 3, name: "Bournemouth", short_name: "BOU", pulse_id: 127 },
  4: { id: 4, name: "Brentford", short_name: "BRE", pulse_id: 130 },
  5: { id: 5, name: "Brighton", short_name: "BHA", pulse_id: 131 },
  6: { id: 6, name: "Chelsea", short_name: "CHE", pulse_id: 4 },
  7: { id: 7, name: "Crystal Palace", short_name: "CRY", pulse_id: 6 },
  8: { id: 8, name: "Everton", short_name: "EVE", pulse_id: 7 },
  9: { id: 9, name: "Fulham", short_name: "FUL", pulse_id: 34 },
  10: { id: 10, name: "Ipswich", short_name: "IPS", pulse_id: 8 },
  11: { id: 11, name: "Leicester", short_name: "LEI", pulse_id: 26 },
  12: { id: 12, name: "Liverpool", short_name: "LIV", pulse_id: 10 },
  13: { id: 13, name: "Man City", short_name: "MCI", pulse_id: 11 },
  14: { id: 14, name: "Man Utd", short_name: "MUN", pulse_id: 12 },
  15: { id: 15, name: "Newcastle", short_name: "NEW", pulse_id: 23 },
  16: { id: 16, name: "Nott'm Forest", short_name: "NFO", pulse_id: 15 },
  17: { id: 17, name: "Southampton", short_name: "SOU", pulse_id: 20 },
  18: { id: 18, name: "Spurs", short_name: "TOT", pulse_id: 21 },
  19: { id: 19, name: "West Ham", short_name: "WHU", pulse_id: 25 },
  20: { id: 20, name: "Wolves", short_name: "WOL", pulse_id: 38 },
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

export { LINKS, NAV_CLASSES, POSITIONS, TEAMS };
