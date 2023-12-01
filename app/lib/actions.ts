"use server";

import { EventStatusResponse, StandingsResponse } from "./types";

const eventStatus = async () => {
  const res: Response = await fetch(
    "https://fantasy.premierleague.com/api/event-status/",
  );

  const resJson: EventStatusResponse = await res.json();

  return resJson?.status?.[0].event || 0;
};

const loadStandings = async (id: number, page = 1) => {
  const res: Response = await fetch(
    `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings?page_standings=${page}`,
  );

  const resJson: StandingsResponse = await res.json();

  return resJson;
};

export { eventStatus, loadStandings };
