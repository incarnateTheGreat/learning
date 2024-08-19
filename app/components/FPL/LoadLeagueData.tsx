import { Card, CardContent } from "learning/@/components/ui/Card/Card";

import { FPLResponse } from "./index";
import LeagueCard from "./LeagueCard";

const LoadLeagueData = async (id: number) => {
  try {
    const res: Response = await fetch(
      `https://fantasy.premierleague.com/api/entry/${id}/`,
    );

    const leagueData: FPLResponse = await res.json();

    return <LeagueCard id={id} leagueData={leagueData} />;
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
