import { PlayerPicksResponse, PredictionDataResponse } from "../lib/types";

const getPredictionData = async () => {
  try {
    const predictionDataResponse: Response = await fetch(
      "https://www.fantasyfootballhub.co.uk/player-data/player-data.json",
    );

    const predictionData: PredictionDataResponse[] =
      await predictionDataResponse.json();

    return predictionData;
  } catch (err) {
    return [];
  }
};

const getAnalyzeData = async (entry: number, currentEvent: number) => {
  const fetchPredictionData = [
    fetch(
      `https://fantasy.premierleague.com/api/entry/${entry}/event/${currentEvent}/picks/`,
      {
        cache: "no-cache",
      },
    ),
  ];

  try {
    const [playerPicksResponse]: Response[] =
      await Promise.all(fetchPredictionData);

    const playerPicks: PlayerPicksResponse = await playerPicksResponse.json();

    const predictionData = await getPredictionData();

    const teamPlayerIds = playerPicks.picks.map((player) => player.element);
    const roster: PredictionDataResponse[] = predictionData.filter((player) =>
      teamPlayerIds.includes(player.fpl.id),
    );

    return roster;
  } catch (err) {
    return [];
  }
};

export { getAnalyzeData, getPredictionData };
