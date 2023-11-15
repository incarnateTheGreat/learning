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
  const res: Response = await fetch(
    `https://fantasy.premierleague.com/api/entry/${id}/`,
  );

  const resJson: FPLResponse = await res.json();

  return resJson ?? [];
}

const numFormatter = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(val);
};

const LeagueList = async ({ id }: LeaguesList) => {
  noStore();

  const leagueData = await loadLeagueData(id);
  const {
    leagues: { classic },
    name,
    summary_event_points,
  } = leagueData;

  const invitationalClassicLeagues = classic.filter(
    (league) => league.league_type === "x",
  );

  return (
    <div className="mr-4 w-full last:mr-0 md:w-1/3">
      <h1 className="mb-4 border-b text-xl font-semibold">
        <span className="mr-2">{name}</span>
        <span>({summary_event_points})</span>
      </h1>
      {invitationalClassicLeagues.map((league: LeagueData) => {
        const { id, name, entry_rank, entry_last_rank } = league;

        return (
          <div key={id} className="mb-4">
            <Link href={`/league/${id}`}>
              <h2 className="post-title text-md font-semibold">{name}</h2>
            </Link>
            <p className="post-body">{numFormatter(entry_rank)}</p>
            {handlePositionArrow(entry_rank, entry_last_rank)}
          </div>
        );
      })}
    </div>
  );
};

export default LeagueList;
