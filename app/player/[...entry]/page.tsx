import {
  ListOfPlayers,
  ListOfPlayersResponse,
  PlayerPicksResponse,
} from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import { Suspense } from "react";

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

const TableRow = ({ playerData, label }: TableRowProps) => {
  return (
    <>
      <div className="table-header-group">
        <div className="table-cell pt-4 font-semibold">{label}</div>
      </div>
      {playerData.map((player) => {
        const { id, web_name, event_points } = player;

        return (
          <div key={id} className="table-row">
            <div className="table-cell w-1/2">{web_name}</div>
            <div className="table-cell w-1/2 text-right">{event_points}</div>
          </div>
        );
      })}
    </>
  );
};

async function getPlayers(entry = 0) {
  const currentEvent = useEventStore.getState().currentEvent;
  //   const currentEvent = 13;

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
  const roster = listOfAllPlayers?.elements.filter((player) => {
    return teamPlayerIds.includes(player.id);
  });

  const rosterResult = roster.reduce((acc, elem) => {
    const position = POSITIONS[elem.element_type];

    const onField = playerPicks.picks.find(
      (player) => player.element === elem.id,
    );

    if (onField.position <= 11) {
      if (acc[position]) {
        acc[position].push(elem);
      } else {
        acc[position] = [elem];
      }
    }

    return acc;
  }, {});

  return (
    <div className="table w-full">
      <div className="table-caption">Gameweek 13</div>
      {/* <TableRow playerData={rosterResult[POSITIONS[1]]} label={POSITIONS[1]} /> */}
      {Object.keys(POSITIONS).map((position) => (
        <TableRow
          key={position}
          playerData={rosterResult[POSITIONS[position]]}
          label={POSITIONS[position]}
        />
      ))}
    </div>
  );
}

const Player = async ({ params: { entry } }: PlayerProps) => {
  const players = await getPlayers(entry.at(0));

  return (
    <Suspense fallback={<h2>Loading player...</h2>}>
      <article className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        {players}
      </article>
    </Suspense>
  );
};

export default Player;
