import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "learning/@/components/ui/Card/Card";
import { LeagueData } from "learning/app/lib/types";
import Link from "next/link";

import ClassicLeague from "./ClassicLeague";
import { FPLResponse } from "./index";
import OverallRank from "./OverallRank";

const filterLeague = (leagueToFilter: LeagueData[]) =>
  leagueToFilter.filter((league) => league.league_type === "x");

const LoadLeagueData = async (id: number) => {
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
              <span>({summary_event_points ?? 0})</span>
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
};

export default LoadLeagueData;
