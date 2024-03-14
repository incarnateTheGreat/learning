import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import { ListOfPlayers } from "learning/app/lib/types";
import { POSITIONS, TEAMS } from "learning/app/utils/constants";

import PlayerGameData from "./PlayerGameData";

type TableRowProps = {
  playerData: ListOfPlayers[];
  label: string;
};

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
          <PlayerTableRow
            key={position}
            playerData={players[POSITIONS[position]]}
            label={POSITIONS[position]}
          />
        );
      })}
    </section>
  );
};

const PlayerTableRow = ({ playerData, label }: TableRowProps) => {
  return (
    <Table className="w-full caption-top">
      <TableHeader>
        <TableRow className="pointer-events-none">
          <TableHead className="px-2 py-1 pt-4 font-semibold text-white">
            {label}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerData?.length > 0 ? (
          playerData.map((player) => {
            const {
              id,
              team,
              first_name,
              second_name,
              web_name,
              total_points,
              has_match_started,
              game_is_live,
              is_captain,
              is_vice_captain,
              stats,
              photo,
              score_block,
            } = player;
            const team_name = TEAMS[team]?.name ?? "N/A";
            const photoExtension = photo.replace(".jpg", ".png");

            return (
              <TableRow
                key={id}
                className={classNames("bg-gray-800", {
                  "bg-green-900": game_is_live,
                })}
              >
                <TableCell className="border-b border-gray-400 p-0">
                  <PlayerGameData
                    web_name={web_name}
                    first_name={first_name}
                    second_name={second_name}
                    is_captain={is_captain}
                    is_vice_captain={is_vice_captain}
                    team_name={team_name}
                    score_block={score_block}
                    photoExtension={photoExtension}
                    stats={stats}
                    total_points={total_points}
                    has_match_started={has_match_started}
                    player_team={team}
                  />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell className="px-2 py-1">None</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { Players };
