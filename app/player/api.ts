import {
  ListOfPlayersResponse,
  ManagerInfoResponse,
  PlayerPicksLiveResponse,
  PlayerPicksResponse,
} from "../lib/types";

const fetchPlayerData = async (entry: number, currentEvent: number) => {
  const fetchPlayerDataUrls = [
    fetch(
      `https://fantasy.premierleague.com/api/entry/${entry}/event/${currentEvent}/picks/`,
    ),
    fetch(`https://fantasy.premierleague.com/api/event/${currentEvent}/live`),
    fetch(`https://fantasy.premierleague.com/api/entry/${entry}`),
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
    fetch(
      `https://fantasy.premierleague.com/api/fixtures/?event=${currentEvent}`,
    ),
  ];

  const [
    playerPicksResponse,
    playerPicksLiveResponse,
    managerInfoResponse,
    listOfAllPlayersResponse,
    gameweekFixturesResponse,
  ]: Response[] = await Promise.all(fetchPlayerDataUrls);

  const playerPicks: PlayerPicksResponse = await playerPicksResponse.json();
  const playerPicksLive: PlayerPicksLiveResponse =
    await playerPicksLiveResponse.json();
  const managerInfo: ManagerInfoResponse = await managerInfoResponse.json();
  const listOfAllPlayers: ListOfPlayersResponse =
    await listOfAllPlayersResponse.json();
  const gameweekFixtures = await gameweekFixturesResponse.json();

  return {
    playerPicks,
    playerPicksLive,
    managerInfo,
    listOfAllPlayers,
    gameweekFixtures,
  };
};

export { fetchPlayerData };
