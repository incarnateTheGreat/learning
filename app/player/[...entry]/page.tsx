import { Suspense } from "react";
import { Players } from "learning/app/league/components/Players";
import {
  GameWeekFixtures,
  ListOfPlayers,
  PlayerPicks,
  PlayerPicksLive,
} from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import { getCurrentEvent } from "learning/app/utils";
import { POSITIONS } from "learning/app/utils/constants";
import refreshImg from "learning/public/refresh.svg";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchPlayerData } from "../api";

type PlayerProps = {
  params: { entry: number[] };
};

const calcPlayerPoints = (total_points: number, is_captain: boolean) => {
  return total_points * (is_captain ? 2 : 1);
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

      const fixture = playerWithLiveData?.explain?.[0]?.fixture;

      const getMatchData = gameweekFixtures.find((game) => {
        return game.id === fixture;
      });

      const player_total_points = calcPlayerPoints(
        playerWithLiveData?.stats?.total_points,
        playerFieldData.is_captain,
      );

      const has_match_started = getMatchData?.started;

      elem["has_match_started"] = has_match_started;
      elem["game_is_live"] =
        getMatchData?.started && !getMatchData.finished_provisional;

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
          <div className="table w-full">
            <h2 className="table-caption text-lg font-semibold">Starting XI</h2>
            <Players players={rosterResult.starters} />
          </div>
          <div className="mt-8 table w-full">
            <h2 className="table-caption text-lg font-semibold">Reserves</h2>
            <Players players={rosterResult.reserves} />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center md:mt-20 md:basis-2/4 md:items-center">
          <div className="rounded-2xl border-2 bg-gray-900 p-10 text-7xl font-semibold">
            {event_points}
          </div>
          <form
            className="mt-2"
            action={async (formData) => {
              "use server";

              const entry = formData.get("entry") as string;

              redirect(`/player/${entry}`);
            }}
          >
            <input name="entry" type="hidden" value={entry} />
            <button>
              <Image src={refreshImg} alt="Refresh" />
            </button>
          </form>
          {isLive ? (
            <div className="text-md mt-2 bg-gray-900 px-4 py-2 font-semibold uppercase text-green-600">
              Live
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}

const Player = async ({ params: { entry } }: PlayerProps) => {
  noStore();

  const players = await getPlayers(entry.at(0));

  return (
    <Suspense fallback={<h2>Loading player...</h2>}>
      <section className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        {players}
      </section>
    </Suspense>
  );
};

export default Player;
