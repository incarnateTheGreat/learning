import { StandingsResponse } from "./types";

const loadStandings = async (id: number, page = 1) => {
  const res: Response = await fetch(
    `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings?page_standings=${page}`,
  );

  const resJson: StandingsResponse = await res.json();

  return resJson ?? [];
};

export { loadStandings };
