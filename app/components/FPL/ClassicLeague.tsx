import { LeagueData } from "learning/app/lib/types";
import { handlePositionArrow, numFormatter } from "learning/app/utils";
import Link from "next/link";

type ClassicLeagueProps = {
  leagueData: LeagueData[];
};

const ClassicLeague = ({ leagueData }: ClassicLeagueProps) => {
  const leagueDataSorted = leagueData.sort((a,b) => a.entry_rank - b.entry_rank)

  return leagueDataSorted.map((league) => {
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
          {entry_rank ? numFormatter(entry_rank) : null}{" "}
          {entry_rank ? handlePositionArrow(entry_rank, entry_last_rank) : "--"}
        </p>
      </div>
    );
  });
};

export default ClassicLeague;
