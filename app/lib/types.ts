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
    id: number;
    name: string;
  };
  standings: {
    has_next: boolean;
    page: number;
    results: Result[];
  };
};

export type { Result, StandingsResponse };
