import { Toaster } from "learning/@/components/ui/Toaster/Toaster";
import PlayerLoaderButton from "learning/app/components/PlayerLoaderButton/PlayerLoaderButton";
import { Players } from "learning/app/league/components/Players";
import {
  GameWeekFixtures,
  ListOfPlayers,
  PlayerPicks,
  PlayerPicksLive,
} from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import {
  activeChips,
  calcPlayerPoints,
  getCurrentEvent,
} from "learning/app/utils";
import { POSITIONS } from "learning/app/utils/constants";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";

import { fetchPlayerData } from "../api";

type PlayerProps = {
  params: { entry: number[] };
};

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

async function getPlayers(entry = 0) {
  const headersList = headers();
  const referer = headersList.get("referer") ?? "/";
  let currentEvent = useEventStore.getState().currentEvent;

  if (!currentEvent) currentEvent = await getCurrentEvent();

  const {
    playerPicks,
    playerPicksLive,
    managerInfo,
    listOfAllPlayers,
    gameweekFixtures,
  } = await fetchPlayerData(entry, currentEvent);

  if (!playerPicks || playerPicks.detail === "Not found.")
    return <div>Sorry. The Manager data is currently unavailable.</div>;

  if (
    typeof playerPicks === "string" &&
    playerPicks === "The game is being updated."
  ) {
    return "The game is being updated.";
  }

  const teamPlayerIds = playerPicks.picks.map((player) => player.element);
  const roster = listOfAllPlayers?.elements.filter((player) =>
    teamPlayerIds.includes(player.id),
  );
  const liveRoster = playerPicksLive.elements.filter((player) =>
    teamPlayerIds.includes(player.id),
  );

  // if live, maybe use /live endpoint, otherwise use this one?
  const currentGameWeek = listOfAllPlayers?.events.find(
    (event) => event.id === currentEvent,
  );

  const isLive =
    (currentGameWeek?.is_current && !currentGameWeek?.finished) ?? false;

  const { rosterResult, event_points } = getRosterResult(
    roster,
    playerPicks.picks,
    liveRoster,
    gameweekFixtures,
  );

  return (
    <>
      <Link href={referer} className="mb-8 flex">
        &laquo; Back
      </Link>
      <h1 className="mb-8 border-b-2 border-gray-400 text-4xl font-semibold">
        {managerInfo.name} /
        <span className="ml-2 text-2xl font-normal">
          {managerInfo.player_first_name} {managerInfo.player_last_name}
        </span>
      </h1>
      <h2 className="mb-8 text-xl font-medium">Gameweek {currentEvent}</h2>
      <article className="flex w-full flex-col-reverse px-1.5 py-1 md:flex-row">
        <div className="mt-8 flex-1 basis-2/4 md:m-0">
          <Players title="Starting XI" players={rosterResult.starters} />
          <Players title="Reserves" players={rosterResult.reserves} />
        </div>
        <div className="flex flex-1 flex-col items-center md:mt-10 md:basis-2/4 md:items-center">
          {playerPicks.active_chip ? (
            <h3 className="text-md mb-4 bg-gray-900 px-4 py-2 font-semibold capitalize text-green-600">
              {activeChips(playerPicks.active_chip)}
            </h3>
          ) : null}
          <div className="rounded-2xl border-2 border-white bg-gray-900 p-10 text-7xl font-semibold">
            {event_points}
          </div>
          {isLive ? (
            <>
              <PlayerLoaderButton entry={entry} classnames="my-4" />
              <div className="text-md bg-gray-900 px-4 py-2 font-semibold uppercase text-green-600">
                Live
              </div>
            </>
          ) : null}
        </div>
        <Toaster />
      </article>
    </>
  );
}

const Player = async ({ params: { entry } }: PlayerProps) => {
  noStore();

  const players = await getPlayers(entry.at(0));

  return (
    <section className="my-4 w-full px-6 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
      {players}
    </section>
  );
};

export default Player;
