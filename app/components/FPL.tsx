import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { handlePositionArrow } from "../utils";

type LeagueData = {
  id: number;
  name: string;
  short_name: string;
  created: string;
  closed: boolean;
  rank: null;
  max_entries: null;
  league_type: string;
  scoring: string;
  admin_entry: null;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league: null;
  cup_qualified: null;
  entry_rank: number;
  entry_last_rank: number;
};

type FPLResponse = {
  name: string;
  summary_event_points: number;
  leagues: {
    classic: [LeagueData];
  };
};

type LeaguesList = {
  id: number;
};

async function loadLeagueData(id: number) {
  try {
    const res: Response = await fetch(
      `https://fantasy.premierleague.com/api/entry/${id}/`,
    );

    const leagueData: FPLResponse = await res.json();

    const {
      leagues: { classic },
      name,
      summary_event_points,
    } = leagueData;

    const invitationalClassicLeagues = filterLeague(classic);

    return (
      <div className="mr-4 mt-4 w-full rounded border border-gray-800 bg-gray-800 p-4 first:mt-0 last:mr-0 md:mt-0 md:w-1/3">
        <h1 className="mb-4 border-b text-xl font-semibold">
          <span className="mr-2">{name}</span>
          <span>({summary_event_points})</span>
        </h1>
        {invitationalClassicLeagues.map((league: LeagueData) => {
          const { id, name, entry_rank, entry_last_rank } = league;

          return (
            <div key={id} className="mb-4">
              <Link href={`/league/${id}`} className="hover:text-gray-300">
                <h2 className="post-title text-md font-semibold">{name}</h2>
              </Link>
              <p className="post-body">{numFormatter(entry_rank)}</p>
              {handlePositionArrow(entry_rank, entry_last_rank)}
            </div>
          );
        })}
      </div>
    );
  } catch (err) {
    return (
      <div className="mr-4 mt-4 w-full rounded border border-gray-800 bg-gray-800 p-4 last:mr-0 md:mt-0 md:w-1/3">
        Sorry. There is no available data at this time.
      </div>
    );
  }
}

const filterLeague = (leagueToFilter: LeagueData[]) =>
  leagueToFilter.filter((league) => league.league_type === "x");

const numFormatter = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(val);
};

const LeagueList = async ({ id }: LeaguesList) => {
  noStore();

  const leagueData = await loadLeagueData(id);

  return <>{leagueData}</>;
};

export default LeagueList;
