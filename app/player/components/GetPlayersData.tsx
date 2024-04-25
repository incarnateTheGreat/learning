import { useEventStore } from "learning/app/store/eventStore";
import { getCurrentEvent } from "learning/app/utils";
import { headers } from "next/headers";
import Link from "next/link";

import { getRosterResult } from "../[...entry]/utils";
import { fetchPlayerData } from "../api";

import PlayerBody from "./PlayerBody";

const GetPlayersData = async (entry = 0) => {
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

  const is_live =
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
        <PlayerBody
          is_live={is_live}
          rosterResult={rosterResult}
          event_points={event_points}
          entry={entry}
          playerPicks={playerPicks}
        />
      </article>
    </>
  );
};

export default GetPlayersData;
