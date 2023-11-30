import {
  ListOfPlayers,
  ListOfPlayersResponse,
  PlayerPicksResponse,
} from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import Link from "next/link";
import { Suspense } from "react";

import { headers } from "next/headers";

type PlayerProps = {
  params: { entry: number[] };
};

const POSITIONS = {
  "1": "Goalkeepers",
  "2": "Defenders",
  "3": "Midfielders",
  "4": "Forwards",
};

type TableRowProps = {
  playerData: ListOfPlayers[];
  label: string;
};

type PlayersProps = {
  players: ListOfPlayers[][];
};

const Players = ({ players }: PlayersProps) => {
  return Object.keys(POSITIONS).map((position) => (
    <TableRow
      key={position}
      playerData={players[POSITIONS[position]]}
      label={POSITIONS[position]}
    />
  ));
};

const TableRow = ({ playerData, label }: TableRowProps) => {
  return (
    <>
      <div className="table-header-group">
        <h2 className="table-cell px-2 py-1 pt-4 font-semibold">{label}</h2>
      </div>
      {playerData?.length > 0 ? (
        playerData.map((player) => {
          const { id, web_name, event_points } = player;

          return (
            <div key={id} className="table-row bg-gray-800">
              <div className="table-cell w-1/2 border-b border-gray-400 px-2 py-1">
                {web_name}
              </div>
              <div className="table-cell w-1/2 border-b border-gray-400 px-2 py-1 text-right font-semibold">
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

async function getPlayers(entry = 0) {
  const headersList = headers();
  const referer = headersList.get("referer") ?? "/";

  const currentEvent = useEventStore.getState().currentEvent;
  // const currentEvent = 13;

  const fetchPlayerDataUrls = [
    fetch(
      `https://fantasy.premierleague.com/api/entry/${entry}/event/${currentEvent}/picks/`,
    ),
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
  ];

  const [playerPicksResponse, listOfAllPlayersResponse]: Response[] =
    await Promise.all(fetchPlayerDataUrls);

  const playerPicks: PlayerPicksResponse = await playerPicksResponse.json();
  const listOfAllPlayers: ListOfPlayersResponse =
    await listOfAllPlayersResponse.json();

  const teamPlayerIds = playerPicks.picks.map((player) => player.element);
  const roster = listOfAllPlayers?.elements.filter((player) =>
    teamPlayerIds.includes(player.id),
  );

  const rosterResult = roster.reduce(
    (acc, elem) => {
      const position = POSITIONS[elem.element_type];

      const onField = playerPicks.picks.find(
        (player) => player.element === elem.id,
      );

      if (onField.position <= 11) {
        if (acc.starters[position]) {
          acc.starters[position].push(elem);
        } else {
          acc.starters[position] = [elem];
        }
      }

      if (onField.position >= 12) {
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

  return (
    <>
      <Link href={referer} className="mb-8 flex">
        &laquo; Back
      </Link>
      <h1 className="mb-8 border-b-2 border-gray-400 text-4xl font-semibold">
        USER
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
        <div className="flex flex-1 flex-col items-center md:mt-24 md:basis-2/4 md:items-end">
          <div className="rounded-2xl border-2 bg-gray-900 p-10 text-7xl font-semibold">
            {playerPicks.entry_history.points}
          </div>
        </div>
      </article>
    </>
  );
}

const Player = async ({ params: { entry } }: PlayerProps) => {
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
