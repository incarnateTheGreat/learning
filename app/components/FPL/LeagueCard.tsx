import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "learning/@/components/ui/Card/Card";
import Link from "next/link";
import React from "react";
import OverallRank from "./OverallRank";
import LeagueStandings from "./LeagueStandings";
import { FPLResponse } from ".";
import { getLeagueData } from "learning/app/utils";
import NonClassicLeague from "./NonClassicLeague";

type LeagueCardProps = {
  id: number;
  leagueData: FPLResponse;
};

export default function LeagueCard({ id, leagueData }: LeagueCardProps) {
  const {
    leagues: { classic },
    name,
    summary_event_points,
    summary_overall_rank,
  } = leagueData;

  const classicLeagueData = getLeagueData(classic, "x");
  const generalLeagueData = getLeagueData(classic, "s");
  const publicClassicLeagueData = getLeagueData(classic, "c");

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
        <div className="bg-blue-800/5">
          <OverallRank
            classicLeagueData={classic}
            summary_overall_rank={summary_overall_rank}
          />
          <LeagueStandings leagueData={classicLeagueData} />
        </div>
        <NonClassicLeague title="General Leagues" data={generalLeagueData} />
        <NonClassicLeague
          title="Public Classic Leagues"
          data={publicClassicLeagueData}
        />
      </CardContent>
    </Card>
  );
}
