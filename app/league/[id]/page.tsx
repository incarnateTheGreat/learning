import {
  formatted_last_updated,
  handlePositionArrow,
} from "learning/app/utils";
import { Suspense } from "react";

type Result = {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
};

type StandingsResponse = {
  last_updated_data: string;
  league: {
    name: string;
  };
  standings: {
    results: [Result];
  };
};

async function loadStandings(id: number) {
  const res: Response = await fetch(
    `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings/`,
  );

  const resJson: StandingsResponse = await res.json();

  return resJson ?? [];
}

type League = {
  params: {
    id: number;
  };
};

const League = async ({ params: { id } }: League) => {
  const standingsData = await loadStandings(id);
  const {
    last_updated_data,
    league: { name },
    standings: { results },
  } = standingsData;

  return (
    <Suspense fallback={<h2>Loading league...</h2>}>
      <div className="mx-auto my-4 table w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        <h1 className="table-caption text-xl font-semibold">{name}</h1>
        <h2 className="mb-2 table-caption">
          Last Updated: {formatted_last_updated(last_updated_data)}
        </h2>
        <div className="table-header-group">
          <div className="table-cell pl-2 font-semibold">Rank</div>
          <div className="table-cell font-semibold">Team &amp; Manager</div>
          <div className="table-cell text-center font-semibold">GW</div>
          <div className="table-cell pr-2 text-right font-semibold">TOT</div>
        </div>
        {results.map((result: Result) => {
          const {
            id,
            player_name,
            entry_name,
            rank,
            last_rank,
            total,
            event_total,
          } = result;

          return (
            <div key={id} className="table-row odd:bg-gray-800">
              <div className="table-cell w-[70px] pl-2">
                <div className="flex">
                  <span className="mr-2 min-w-[14px]">
                    {handlePositionArrow(rank, last_rank)}
                  </span>
                  <span>{rank}</span>
                </div>
              </div>
              <div className="table-cell">
                {entry_name} / {player_name}
              </div>
              <div className="table-cell w-[50px] text-center">
                {event_total}
              </div>
              <div className="table-cell pr-2 text-right">{total}</div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
};

export default League;
