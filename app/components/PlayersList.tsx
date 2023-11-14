import { PlayersRecord, getXataClient } from "learning/src/xata";
import { SelectedPick } from "@xata.io/client";

type PlayersList = {
  size: number;
};

async function loadPlayers(size: number) {
  const xata = getXataClient();

  const records = await xata.db.playersRandom
    .select(["id", "name", "position", "age"])
    .getPaginated({
      pagination: {
        size,
      },
    });

  return records.records;
}

const PlayersList = async ({ size }: PlayersList) => {
  const players = await loadPlayers(size);

  return (
    <div className="w-[800px] mt-4">
      {players.map(
        (
          player: SelectedPick<
            PlayersRecord,
            ("name" | "position" | "age" | "id")[]
          >
        ) => (
          <div key={player.id} className="mb-4">
            <div className="text-3xl font-semibold">{player.name}</div>
            <div>{player.position}</div>
            <div>{player.age}</div>
          </div>
        )
      )}
    </div>
  );
};

export default PlayersList;
