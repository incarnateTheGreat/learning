import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "learning/@/components/ui/Card/Card";
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

export type FPLResponse = {
  id: number;
  name: string;
  summary_event_points: number;
  leagues: {
    classic: [LeagueData];
  };
  summary_overall_rank: number;
  detail?: string;
};

type LeaguesList = {
  id: number;
};

type ClassicLeagueProps = {
  leagueData: LeagueData[];
};

type OverallRankProps = {
  summary_overall_rank: number;
  overall_entry_rank: number;
  overall_entry_last_rank: number;
};

const filterLeague = (leagueToFilter: LeagueData[]) =>
  leagueToFilter.filter((league) => league.league_type === "x");

const numFormatter = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(val);
};

const OverallRank = ({
  summary_overall_rank,
  overall_entry_rank,
  overall_entry_last_rank,
}: OverallRankProps) => {
  return (
    <div className="mb-2 mt-4 rounded bg-[#0c1b42] px-6 py-2">
      <span className="text-md font-semibold">Overall:</span>
      <span className="ml-2">
        {numFormatter(summary_overall_rank)}
        {handlePositionArrow(
          overall_entry_rank,
          overall_entry_last_rank,
          "ml-1",
        )}
      </span>
    </div>
  );
};

const ClassicLeague = ({ leagueData }: ClassicLeagueProps) => {
  return leagueData.map((league) => {
    const { id, name, entry_rank, entry_last_rank } = league;

    return (
      <div key={id} className="mb-4 px-6 last:mb-0">
        <Link
          href={`/league/${id}`}
          className="inline-flex hover:text-gray-300"
        >
          <h2 className="text-md font-semibold">{name}</h2>
        </Link>
        <p>
          {numFormatter(entry_rank)}{" "}
          {handlePositionArrow(entry_rank, entry_last_rank)}
        </p>
      </div>
    );
  });
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
      summary_overall_rank,
    } = leagueData;

    const {
      entry_rank: overall_entry_rank,
      entry_last_rank: overall_entry_last_rank,
    } = classic.find((league) => league.name === "Overall");

    const invitationalClassicLeagues = filterLeague(classic);

    return (
      <Card className="rounded py-4 first:mt-0 md:mt-0">
        <CardHeader className="py-0">
          <CardTitle>
            <Link
              href={`/player/${id}`}
              title="Click here to view your team"
              className="block border-b border-b-slate-200 text-xl font-semibold transition-all hover:border-b-slate-400 hover:text-white/80"
            >
              <span className="mr-2">{name}</span>
              <span>({summary_event_points})</span>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <OverallRank
            summary_overall_rank={summary_overall_rank}
            overall_entry_rank={overall_entry_rank}
            overall_entry_last_rank={overall_entry_last_rank}
          />
          <ClassicLeague leagueData={invitationalClassicLeagues} />
        </CardContent>
      </Card>
    );
  } catch (err) {
    return (
      <Card className="md:mt-0">
        <CardContent className="pt-4">
          Sorry. There is no available data at this time.
        </CardContent>
      </Card>
    );
  }
}

const LeagueList = async ({ id }: LeaguesList) => {
  noStore();

  const leagueData = await loadLeagueData(id);

  return <>{leagueData}</>;
};

export default LeagueList;
