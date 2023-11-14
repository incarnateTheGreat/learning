import { handlePositionArrow } from "learning/app/utils";

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
    `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings/`
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

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    day: "numeric",
    month: "short",
    weekday: "long",
  });

  const formatted_last_updated = formatter.format(new Date(last_updated_data));

  return (
    <div className="table w-4/5 max-w-[800px] mx-auto my-4">
      <h1 className="table-caption text-xl font-semibold">{name}</h1>
      <h2 className="table-caption mb-2">
        Last Updated: {formatted_last_updated}
      </h2>
      <div className="table-header-group">
        <div className="table-cell font-semibold">Rank</div>
        <div className="table-cell font-semibold">Team &amp; Manager</div>
        <div className="table-cell font-semibold text-center">GW</div>
        <div className="table-cell font-semibold text-right">TOT</div>
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
            <div className="table-cell">
              <div className="flex">
                <span className="mr-2 min-w-[14px]">{rank}</span>
                <span>{handlePositionArrow(rank, last_rank)}</span>
              </div>
            </div>
            <div className="table-cell">
              {entry_name} / {player_name}
            </div>
            <div className="table-cell text-center">{event_total}</div>
            <div className="table-cell text-right">{total}</div>
          </div>
        );
      })}
    </div>
  );
};

export default League;
