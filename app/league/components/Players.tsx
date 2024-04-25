import { ListOfPlayers } from "learning/app/lib/types";
import { POSITIONS } from "learning/app/utils/constants";

import PlayerTable from "./PlayerTable";

type PlayersProps = {
  title: string;
  players: ListOfPlayers[][];
};

const Players = ({ title, players }: PlayersProps) => {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {Object.keys(POSITIONS).map((position) => {
        if (
          players[POSITIONS[position]]?.length === 0 ||
          !players[POSITIONS[position]]
        )
          return;

        return (
          <PlayerTable
            key={position}
            playerData={players[POSITIONS[position]]}
            label={POSITIONS[position]}
          />
        );
      })}
    </section>
  );
};

export default Players;
