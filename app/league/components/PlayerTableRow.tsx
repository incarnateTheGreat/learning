import classNames from "classnames";
import { TableCell, TableRow } from "learning/@/components/ui/Table/Table";
import { ListOfPlayers } from "learning/app/lib/types";
import { TEAMS } from "learning/app/utils/constants";

import ImageThumbnail from "./ImageThumbnail";
import PlayerGameData from "./PlayerGameData";

type PlayerTableRowProps = {
  player: ListOfPlayers;
};

const PlayerTableRow = ({ player }: PlayerTableRowProps) => {
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
      <TableCell className="flex border-b border-gray-400 p-0 px-2 pt-1">
        <ImageThumbnail
          name={`${first_name} ${second_name}`}
          photoExtension={photoExtension}
          imageClassnames="h-[75px] w-[75px] md:h-[50px] md:w-[60px]"
        />
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
};

export default PlayerTableRow;
