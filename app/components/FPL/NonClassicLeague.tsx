import { LeagueData } from "learning/app/lib/types";
import React from "react";
import LeagueStandings from "./LeagueStandings";

type NonClassicLeagueProps = {
  title: string;
  data: LeagueData[];
};

export default function NonClassicLeague({
  title,
  data,
}: NonClassicLeagueProps) {
  return (
    <div className="mt-4 bg-blue-800/5 py-3">
      <h2 className="px-6 pb-2 text-lg font-bold">{title}</h2>
      <div className="p-0">
        <LeagueStandings leagueData={data} />
      </div>
    </div>
  );
}
