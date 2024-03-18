import { Toaster } from "learning/@/components/ui/Toaster/Toaster";
import PlayerLoaderButton from "learning/app/components/PlayerLoaderButton/PlayerLoaderButton";
import { Players } from "learning/app/league/components/Players";
import { useEventStore } from "learning/app/store/eventStore";
import { activeChips, getCurrentEvent } from "learning/app/utils";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";

import { fetchPlayerData } from "../api";

import { getRosterResult } from "./utils";

type PlayerProps = {
  params: { entry: number[] };
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
      <h3 className="mb-8 text-xl font-medium">
        Transfers: {playerPicks.entry_history.event_transfers}{" "}
        {playerPicks.entry_history.event_transfers_cost > 0
          ? `(-${playerPicks.entry_history.event_transfers_cost})`
          : null}
      </h3>
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
