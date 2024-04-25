import { StandingsResponse } from "learning/app/lib/types";

import LeagueStandings from "./components/LeagueStandings";

const LoadStandingsData = async (id: number, page_number = 1) => {
  try {
    const res: Response = await fetch(
      `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings?page_standings=${page_number}`,
    );

    const standingsData: StandingsResponse = await res.json();

    const {
      last_updated_data,
      league: { name },
      standings: { page, results, has_next },
    } = standingsData;

    return {
      data: {
        standings: { new_page: page, has_next },
      },
      standings: (
        <LeagueStandings
          results={results}
          last_updated_data={last_updated_data}
          name={name}
        />
      ),
    };
  } catch (err) {
    return null;
  }
};

export default LoadStandingsData;
