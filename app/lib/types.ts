type EventStatusResponse = {
  status: [
    {
      bonus_added: boolean;
      date: string;
      event: number;
      points: string;
    },
  ];
  leagues: string;
};

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

type ManagerInfoResponse = {
  id: number;
  joined_time: string;
  started_event: number;
  favourite_team: number;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  name: string;
  name_change_blocked: boolean;
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
};

type PlayerPicks = {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
};

type PlayerPicksResponse = {
  active_chip: string;
  detail?: string;
  entry_history: {
    event: number;
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    bank: number;
    value: number;
    event_transfers: number;
    event_transfers_cost: number;
    points_on_bench: number;
  };
  picks: PlayerPicks[];
};

type PlayerLiveStats = {
  identifier: string;
  points: number;
  value: number;
};

type PlayerPicksLive = {
  id: number;
  stats: {
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
    total_points: number;
    in_dreamteam: boolean;
  };
  explain: [
    {
      fixture: number;
      stats: PlayerLiveStats[];
    },
  ];
};

type PlayerPicksLiveResponse = {
  elements: PlayerPicksLive[];
};

type GameWeekFixtures = {
  code: number;
  event: number;
  finished: boolean;
  finished_provisional: boolean;
  id: number;
  kickoff_time: "2023-12-06T19:30:00Z";
  minutes: number;
  provisional_start_time: boolean;
  started: boolean;
  team_a: number;
  team_a_score: null;
  team_h: number;
  team_h_score: null;
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
  date: string;
};

type CustomPlayerProps = {
  has_match_started: boolean;
  game_is_live: boolean;
  score_block: GameWeekFixtures;
};

type ListOfPlayers = PlayerPicks &
  GameWeekFixtures &
  CustomPlayerProps & {
    chance_of_playing_next_round: number;
    chance_of_playing_this_round: number;
    code: number;
    cost_change_event: number;
    cost_change_event_fall: number;
    cost_change_start: number;
    cost_change_start_fall: number;
    dreamteam_count: number;
    did_play: boolean;
    element_type: number;
    ep_next: string;
    ep_this: string;
    event_points: number;
    first_name: string;
    form: string;
    id: number;
    in_dreamteam: boolean;
    news: string;
    news_added: string;
    now_cost: number;
    photo: string;
    points_per_game: string;
    second_name: string;
    selected_by_percent: string;
    special: boolean;
    squad_number: null;
    status: string;
    team: number;
    team_code: number;
    total_points: number;
    transfers_in: number;
    transfers_in_event: number;
    transfers_out: number;
    transfers_out_event: number;
    value_form: string;
    value_season: string;
    web_name: string;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
    influence_rank: number;
    influence_rank_type: number;
    creativity_rank: number;
    creativity_rank_type: number;
    threat_rank: number;
    threat_rank_type: number;
    ict_index_rank: number;
    ict_index_rank_type: number;
    corners_and_indirect_freekicks_order: null;
    corners_and_indirect_freekicks_text: string;
    direct_freekicks_order: null;
    direct_freekicks_text: string;
    penalties_order: null;
    penalties_text: string;
    expected_goals_per_90: number;
    saves_per_90: number;
    expected_assists_per_90: number;
    expected_goal_involvements_per_90: number;
    expected_goals_conceded_per_90: number;
    goals_conceded_per_90: number;
    now_cost_rank: number;
    now_cost_rank_type: number;
    form_rank: number;
    form_rank_type: number;
    points_per_game_rank: number;
    points_per_game_rank_type: number;
    selected_rank: number;
    selected_rank_type: number;
    starts_per_90: number;
    clean_sheets_per_90: number;
    stats: PlayerLiveStats[];
  };

type ListOfPlayersEvents = {
  id: number;
  name: string;
  deadline_time: string;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  chip_plays: [
    {
      chip_name: string;
      num_played: number;
    },
    {
      chip_name: string;
      num_played: number;
    },
  ];
  most_selected: number;
  most_transferred_in: number;
  top_element: number;
  top_element_info: {
    id: number;
    points: number;
  };
  transfers_made: number;
  most_captained: number;
  most_vice_captained: number;
};

type ListOfPlayersTeams = {
  code: number;
  draw: number;
  form: null;
  id: number;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  short_name: string;
  strength: number;
  team_division: null;
  unavailable: boolean;
  win: number;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  pulse_id: number;
};

type ListOfPlayersResponse = {
  events: ListOfPlayersEvents[];
  elements: ListOfPlayers[];
  teams: ListOfPlayersTeams[];
};

type PredictionDataResponse = {
  code: number;
  webName: string;
  searchTerm: string;
  team: {
    code: number;
    name: string;
    codeName: string;
  };
  season: number;
  data: {
    status: string;
    nowCost: number;
    teamCode: number;
    priceInfo: {
      Code: number;
      Team: string;
      Value: number;
      HrRate: number;
      Status: string;
      Target: number;
      Position: string;
      Ownership: number;
      ChangeTime: string;
      PlayerName: string;
      RateOfChange: number;
    };
    positionId: number;
    predictions: [
      {
        gw: number;
        opp: string[][];
        capt: number;
        xmins: number;
        status: string;
        fitness: number;
        predicted_pts: number;
      },
    ];
    teamCodeName: string;
    next_gw_xmins: number;
    prediction4GW: number;
    formatted_cost: string;
    weighted_prediction: number;
  };
  fpl: {
    id: number;
    bps: number;
    code: number;
    form: string;
    news: string;
    team: number;
    bonus: number;
    photo: string;
    saves: number;
    starts: number;
    status: string;
    threat: string;
    assists: number;
    ep_next: string;
    ep_this: string;
    minutes: number;
    special: boolean;
    now_cost: number;
    web_name: string;
    form_rank: number;
    ict_index: string;
    influence: string;
    own_goals: number;
    red_cards: number;
    team_code: number;
    creativity: string;
    first_name: string;
    news_added: string;
    value_form: string;
    second_name: string;
    threat_rank: number;
    clean_sheets: number;
    element_type: number;
    event_points: number;
    goals_scored: number;
    in_dreamteam: boolean;
    saves_per_90: number;
    squad_number: null;
    total_points: number;
    transfers_in: number;
    value_season: string;
    yellow_cards: number;
    now_cost_rank: number;
    selected_rank: number;
    starts_per_90: number;
    transfers_out: number;
    expected_goals: string;
    form_rank_type: number;
    goals_conceded: number;
    ict_index_rank: number;
    influence_rank: number;
    penalties_text: string;
    creativity_rank: number;
    dreamteam_count: number;
    penalties_order: number;
    penalties_saved: number;
    points_per_game: string;
    expected_assists: string;
    penalties_missed: number;
    threat_rank_type: number;
    cost_change_event: number;
    cost_change_start: number;
    now_cost_rank_type: number;
    selected_rank_type: number;
    transfers_in_event: number;
    clean_sheets_per_90: number;
    ict_index_rank_type: number;
    influence_rank_type: number;
    selected_by_percent: string;
    transfers_out_event: number;
    creativity_rank_type: number;
    points_per_game_rank: number;
    direct_freekicks_text: string;
    expected_goals_per_90: number;
    goals_conceded_per_90: number;
    cost_change_event_fall: number;
    cost_change_start_fall: number;
    direct_freekicks_order: number;
    expected_assists_per_90: number;
    expected_goals_conceded: string;
    points_per_game_rank_type: number;
    expected_goal_involvements: string;
    chance_of_playing_next_round: number;
    chance_of_playing_this_round: number;
    expected_goals_conceded_per_90: number;
    expected_goal_involvements_per_90: number;
    corners_and_indirect_freekicks_text: string;
    corners_and_indirect_freekicks_order: null;
  };
  live: {
    bps: number;
    bonus: number;
    saves: number;
    starts: number;
    threat: string;
    assists: number;
    minutes: number;
    ict_index: string;
    influence: string;
    own_goals: number;
    red_cards: number;
    creativity: string;
    clean_sheets: number;
    goals_scored: number;
    in_dreamteam: false;
    total_points: number;
    yellow_cards: number;
    expected_goals: string;
    goals_conceded: number;
    penalties_saved: number;
    expected_assists: string;
    penalties_missed: number;
    expected_goals_conceded: string;
    expected_goal_involvements: string;
  };
  fpl_ownership: 51.5;
  elite_ownership: 4;
  elite_ownership_change: 1;
  player_pool_status: string;
};

export type {
  EventStatusResponse,
  GameWeekFixtures,
  ListOfPlayers,
  ListOfPlayersResponse,
  ManagerInfoResponse,
  PlayerLiveStats,
  PlayerPicks,
  PlayerPicksLive,
  PlayerPicksLiveResponse,
  PlayerPicksResponse,
  PredictionDataResponse,
  Result,
  StandingsResponse,
};
