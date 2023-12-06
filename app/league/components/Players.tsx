import classNames from "classnames";
import { ListOfPlayers } from "learning/app/lib/types";
import { POSITIONS, TEAMS } from "learning/app/utils/constants";

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
          const {
            id,
            team,
            web_name,
            total_points,
            has_match_started,
            game_is_live,
          } = player;
          const team_name = TEAMS[team]?.name ?? "N/A";

          return (
            <div
              key={id}
              className={classNames("table-row bg-gray-800", {
                "bg-green-900": game_is_live,
              })}
            >
              <div className="table-cell border-b border-gray-400 px-2 py-1">
                {web_name}{" "}
                <span className="text-sm text-gray-200">({team_name})</span>
              </div>
              <div className="table-cell border-b border-gray-400 px-2 py-1 text-right font-semibold">
                {has_match_started ? total_points : "-"}
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

export { Players };
