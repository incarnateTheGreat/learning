import {
  ListOfPlayersResponse,
  ManagerInfoResponse,
  PlayerPicksLiveResponse,
  PlayerPicksResponse,
} from "../lib/types";
import useStaticStore from "../store/staticStore";

const fetchPlayerData = async (entry: number, currentEvent: number) => {
  const persistedListOfPlayers = useStaticStore.getState().listOfAllPlayers;

  const fetchPlayerDataUrls = [
    fetch(
      `https://fantasy.premierleague.com/api/entry/${entry}/event/${currentEvent}/picks/`,
    ),
    fetch(`https://fantasy.premierleague.com/api/event/${currentEvent}/live`),
    fetch(`https://fantasy.premierleague.com/api/entry/${entry}`),
    fetch(
      `https://fantasy.premierleague.com/api/fixtures/?event=${currentEvent}`,
    ),
  ];

  try {
    const [
      playerPicksResponse,
      playerPicksLiveResponse,
      managerInfoResponse,
      gameweekFixturesResponse,
    ]: Response[] = await Promise.all(fetchPlayerDataUrls);

    const playerPicks: PlayerPicksResponse = await playerPicksResponse.json();
    const playerPicksLive: PlayerPicksLiveResponse =
      await playerPicksLiveResponse.json();
    const managerInfo: ManagerInfoResponse = await managerInfoResponse.json();
    const gameweekFixtures = await gameweekFixturesResponse.json();

    let listOfAllPlayers: ListOfPlayersResponse;

    // Store the List of Players static query in persisted state to help improve the performance.
    if (!persistedListOfPlayers) {
      const listOfAllPlayersRespnse: Response = await fetch(
        "https://fantasy.premierleague.com/api/bootstrap-static/",
      );

      listOfAllPlayers = await listOfAllPlayersRespnse.json();

      useStaticStore.setState(() => ({
        listOfAllPlayers,
      }));
    } else {
      listOfAllPlayers = persistedListOfPlayers;
    }

    return {
      playerPicks,
      playerPicksLive,
      managerInfo,
      listOfAllPlayers,
      gameweekFixtures,
    };
  } catch (err) {
    return {
      playerPicks: null,
      playerPicksLive: null,
      managerInfo: null,
      listOfAllPlayers: null,
      gameweekFixtures: null,
    };
  }
};

export { fetchPlayerData };
