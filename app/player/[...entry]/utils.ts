import {
  GameWeekFixtures,
  ListOfPlayers,
  PlayerPicks,
  PlayerPicksLive,
} from "learning/app/lib/types";
import { calcPlayerPoints } from "learning/app/utils";
import { POSITIONS } from "learning/app/utils/constants";

const getRosterResult = (
  roster: ListOfPlayers[],
  playerPicks: PlayerPicks[],
  playerPicksLive: PlayerPicksLive[],
  gameweekFixtures: GameWeekFixtures[],
) => {
  let event_points = 0;

  const rosterResult = roster.reduce(
    (acc, elem) => {
      const position = POSITIONS[elem.element_type];

      const playerFieldData = playerPicks.find(
        (player) => player.element === elem.id,
      );

      const playerWithLiveData = playerPicksLive.find(
        (player) => player.id === elem.id,
      );

      const fixtures = playerWithLiveData?.explain.reduce((acc, elem) => {
        acc.push(elem.fixture);

        return acc;
      }, []);
      const stats = playerWithLiveData?.explain.reduce((acc, elem) => {
        acc.push(elem.stats);

        return acc;
      }, []);

      const getMatchData = gameweekFixtures.filter((game) => {
        return fixtures.includes(game.id);
      });

      const player_total_points = calcPlayerPoints(
        playerWithLiveData?.stats?.total_points,
        playerFieldData.is_captain,
      );

      const has_match_started = getMatchData.some((game) => {
        return game.started;
      });

      const game_is_live = getMatchData.some((game) => {
        return game.started && !game.finished_provisional;
      });

      elem["score_block"] = getMatchData;
      elem["stats"] = stats;
      elem["has_match_started"] = has_match_started;
      elem["game_is_live"] = game_is_live;

      // Starters
      if (playerFieldData.position <= 11) {
        event_points += player_total_points;

        elem["total_points"] = player_total_points;
        elem["is_captain"] = playerFieldData.is_captain;
        elem["is_vice_captain"] = playerFieldData.is_vice_captain;

        if (acc?.starters?.[position]) {
          acc.starters[position].push(elem);
        } else {
          acc.starters[position] = [elem];
        }
      }

      // Reserves
      if (playerFieldData.position >= 12) {
        elem["total_points"] = player_total_points;

        if (acc?.reserves?.[position]) {
          acc.reserves[position].push(elem);
        } else {
          acc.reserves[position] = [elem];
        }
      }

      return acc;
    },
    {
      starters: [],
      reserves: [],
    },
  );

  return { rosterResult, event_points };
};

export { getRosterResult };
