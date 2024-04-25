import DateDisplay from "learning/app/components/DateDisplay";
import { Result } from "learning/app/lib/types";

import LeagueTable from "./LeagueTable";

type LeagueStandingsProps = {
  results: Result[];
  name: string;
  last_updated_data: string;
};

const LeagueStandings = ({
  results,
  name,
  last_updated_data,
}: LeagueStandingsProps) => {
  return (
    <>
      <h1 className="border-b border-b-slate-500 text-2xl font-semibold">
        {name}
      </h1>
      <h2 className="mt-1.5 text-sm">
        <span className="font-semibold">Last Updated: </span>
        <DateDisplay date={last_updated_data} /> (local time)
      </h2>
      <LeagueTable results={results} last_updated_data={last_updated_data} />
    </>
  );
};

export default LeagueStandings;
