import classNames from "classnames";
import { Card } from "learning/@/components/ui/Card/Card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "learning/@/components/ui/Drawer/Drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import { ListOfPlayers } from "learning/app/lib/types";
import { POSITIONS, TEAMS } from "learning/app/utils/constants";

import ImageThumbnail from "./ImageThumbnail";

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
      <PlayerTableRow
        key={position}
        playerData={players[POSITIONS[position]]}
        label={POSITIONS[position]}
      />
    );
  });
};

const PlayerTableRow = ({ playerData, label }: TableRowProps) => {
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
            player_team_scoreline,
          } = player;
          const team_name = TEAMS[team]?.name ?? "N/A";
          const photoExtension = photo.replace(".jpg", ".png");

          return (
            <Drawer key={id}>
              <div
                className={classNames("table-row bg-gray-800", {
                  "bg-green-900": game_is_live,
                })}
              >
                <DrawerTrigger className="flex w-full justify-between border-b border-gray-400">
                  <div className="table-cell px-2 py-1">
                    {web_name}{" "}
                    <span className="text-sm text-gray-200">
                      ({team_name}) {is_captain ? "(C)" : null}{" "}
                      {is_vice_captain ? "(V)" : null}
                    </span>
                  </div>
                  <div className="table-cell px-2 py-1 text-right font-semibold">
                    {has_match_started ? total_points : "-"}
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="m-auto flex flex-col md:w-[800px]">
                    <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
                      <div>
                        <DrawerTitle className="text-3xl font-normal">
                          <span>{first_name}</span>{" "}
                          <span className="font-semibold">{second_name}</span>{" "}
                          {is_captain ? (
                            <span className="font-semibold">(C)</span>
                          ) : null}
                        </DrawerTitle>
                        <DrawerDescription className="text-center md:text-left">
                          {team_name}
                        </DrawerDescription>
                      </div>
                      <Card
                        className={classNames(
                          "my-2 flex h-10 items-center justify-center rounded-[6px] px-2 text-sm md:my-0 md:w-auto md:justify-normal",
                          {
                            "bg-green-900": game_is_live,
                          },
                        )}
                      >
                        {player_team_scoreline}
                      </Card>
                    </div>
                    {/* TODO: Maybe fix FUAC spacing with Display Grid */}
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <ImageThumbnail
                        web_name={web_name}
                        photoExtension={photoExtension}
                      />
                      <Table className="mt-4 md:ml-auto md:mt-0 md:w-[90%]">
                        <TableHeader className="pointer-events-none">
                          <TableRow>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stats.map((stat) => {
                            const { points, value } = stat;
                            const identifier = stat.identifier.replace(
                              "_",
                              " ",
                            );

                            return (
                              <TableRow
                                className="pointer-events-none"
                                key={identifier}
                              >
                                <TableCell className="text-left capitalize">
                                  {identifier}
                                </TableCell>
                                <TableCell className="text-right">
                                  {value}
                                </TableCell>
                                <TableCell className="text-right">
                                  {points}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          {is_captain ? (
                            <TableRow className="pointer-events-none">
                              <TableCell
                                className="text-left font-bold"
                                colSpan={2}
                              >
                                Captain
                              </TableCell>
                              <TableCell className="text-right font-bold">
                                x2
                              </TableCell>
                            </TableRow>
                          ) : null}
                        </TableBody>
                        <TableFooter>
                          <TableRow className="pointer-events-none">
                            <TableCell className="text-left" colSpan={2}>
                              Total
                            </TableCell>
                            <TableCell className="text-right">
                              {total_points}
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
                  </DrawerHeader>
                </DrawerContent>
              </div>
            </Drawer>
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
