import { unstable_noStore as noStore } from "next/cache";

import {
  ListOfPlayers,
  ListOfPlayersResponse,
  ManagerInfoResponse,
  PlayerPicksResponse,
} from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import Link from "next/link";
import { Suspense } from "react";

import { headers } from "next/headers";
import { POSITIONS, TEAMS } from "learning/app/utils/constants";
import { getCurrentEvent } from "learning/app/utils";

type PlayerProps = {
  params: { entry: number[] };
};

type TableRowProps = {
  playerData: ListOfPlayers[];
  label: string;
};

type PlayersProps = {
  players: ListOfPlayers[][];
};

const Players = ({ players }: PlayersProps) => {
  return Object.keys(POSITIONS).map((position) => {
    if (
      players[POSITIONS[position]]?.length === 0 ||
      !players[POSITIONS[position]]
    )
      return;

    return (
      <TableRow
        key={position}
        playerData={players[POSITIONS[position]]}
        label={POSITIONS[position]}
      />
    );
  });
};

const TableRow = ({ playerData, label }: TableRowProps) => {
  return (
    <>
      <div className="table-header-group">
        <h2 className="table-cell px-2 py-1 pt-4 font-semibold">{label}</h2>
      </div>
      {playerData?.length > 0 ? (
        playerData.map((player) => {
          const { id, team, web_name, event_points } = player;
          const team_name = TEAMS[team]?.name ?? "N/A";

          return (
            <div key={id} className="table-row bg-gray-800">
              <div className="table-cell border-b border-gray-400 px-2 py-1">
                {web_name}{" "}
                <span className="text-sm text-gray-200">({team_name})</span>
              </div>
              <div className="table-cell border-b border-gray-400 px-2 py-1 text-right font-semibold">
                {event_points}
              </div>
            </div>
          );
        })
      ) : (
        <div className="table-row">
          <div className="table-cell px-2 py-1">None</div>
        </div>
      )}
    </>
  );
};

const fetchPlayerData = async (entry: number, currentEvent: number) => {
  const fetchPlayerDataUrls = [
    fetch(
      `https://fantasy.premierleague.com/api/entry/${entry}/event/${currentEvent}/picks/`,
    ),
    fetch(`https://fantasy.premierleague.com/api/entry/${entry}`),
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
  ];

  const [
    playerPicksResponse,
    managerInfoResponse,
    listOfAllPlayersResponse,
  ]: Response[] = await Promise.all(fetchPlayerDataUrls);

  const playerPicks: PlayerPicksResponse = await playerPicksResponse.json();
  const managerInfo: ManagerInfoResponse = await managerInfoResponse.json();
  const listOfAllPlayers: ListOfPlayersResponse =
    await listOfAllPlayersResponse.json();

  return { playerPicks, managerInfo, listOfAllPlayers };
};

const getRosterResult = async (
  roster: ListOfPlayers[],
  playerPicks: {
    element: number;
    position: number;
    multiplier: number;
    is_captain: boolean;
    is_vice_captain: boolean;
  }[],
) => {
  let event_points = 0;

  const rosterResult = roster.reduce(
    (acc, elem) => {
      const position = POSITIONS[elem.element_type];

      const playerFieldData = playerPicks.find(
        (player) => player.element === elem.id,
      );

      // Starters
      if (playerFieldData.position <= 11) {
        if (acc.starters[position]) {
          acc.starters[position].push(elem);
        } else {
          acc.starters[position] = [elem];
        }

        event_points += elem.event_points;
      }

      // Reserves
      if (playerFieldData.position >= 12) {
        if (acc.reserves[position]) {
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

  const { playerPicks, managerInfo, listOfAllPlayers } = await fetchPlayerData(
    entry,
    currentEvent,
  );

  const teamPlayerIds = playerPicks.picks.map((player) => player.element);
  const roster = listOfAllPlayers?.elements.filter((player) =>
    teamPlayerIds.includes(player.id),
  );

  const isLive =
    listOfAllPlayers?.events.find((event) => event.id === currentEvent)
      ?.is_current ?? false;

  const { rosterResult, event_points } = await getRosterResult(
    roster,
    playerPicks.picks,
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
          {isLive ? (
            <div className="text-md mt-4 bg-gray-900 px-4 py-2 font-semibold uppercase text-green-600">
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
