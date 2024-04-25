import { LeagueData } from "learning/app/lib/types";
import { unstable_noStore as noStore } from "next/cache";

import LoadLeagueData from "./LoadLeagueData";

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

const LeagueList = async ({ id }: LeaguesList) => {
  noStore();

  const leagueData = await LoadLeagueData(id);

  return <>{leagueData}</>;
};

export default LeagueList;
