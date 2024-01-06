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
import { PlayerLiveStats } from "learning/app/lib/types";

import ImageThumbnail from "./ImageThumbnail";

type PlayerGameDataProps = {
  web_name: string;
  first_name: string;
  second_name: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  team_name: string;
  game_is_live: boolean;
  player_team_scoreline: string;
  photoExtension: string;
  stats: PlayerLiveStats[];
  total_points: number;
  has_match_started: boolean;
};

const PlayerGameData = ({
  web_name,
  first_name,
  second_name,
  is_captain,
  is_vice_captain,
  team_name,
  game_is_live,
  player_team_scoreline,
  photoExtension,
  stats,
  total_points,
  has_match_started,
}: PlayerGameDataProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="flex w-full items-center justify-between px-2 py-1">
        <div>
          {web_name}{" "}
          <span className="text-sm text-gray-200">
            ({team_name}) {is_captain ? "(C)" : null}{" "}
            {is_vice_captain ? "(V)" : null}
          </span>
        </div>
        <span className="text-right font-semibold">
          {has_match_started ? total_points : "-"}
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="m-auto flex w-full flex-col md:w-[800px]">
          <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
            <div>
              <DrawerTitle className="text-3xl font-normal">
                <span>{first_name}</span>{" "}
                <span className="font-semibold">{second_name}</span>{" "}
                {is_captain ? <span className="font-semibold">(C)</span> : null}
              </DrawerTitle>
              <DrawerDescription className="text-center md:text-left">
                {team_name}
              </DrawerDescription>
            </div>
            <Card
              className={classNames(
                "my-2 flex h-10 items-center justify-center rounded-[6px] border-dotted px-3 text-sm md:my-0 md:w-auto md:justify-normal",
                {
                  "bg-green-900": game_is_live,
                },
              )}
            >
              {player_team_scoreline}
            </Card>
          </div>
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <ImageThumbnail
              name={`${first_name} ${second_name}`}
              photoExtension={photoExtension}
            />
            <Table className="w-full md:ml-auto md:max-w-[60%]">
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
                  const identifier = stat.identifier.replace("_", " ");

                  return (
                    <TableRow className="pointer-events-none" key={identifier}>
                      <TableCell className="text-left capitalize">
                        {identifier}
                      </TableCell>
                      <TableCell className="text-right">{value}</TableCell>
                      <TableCell className="text-right">{points}</TableCell>
                    </TableRow>
                  );
                })}
                {is_captain ? (
                  <TableRow className="pointer-events-none">
                    <TableCell className="text-left font-bold" colSpan={2}>
                      Captain
                    </TableCell>
                    <TableCell className="text-right font-bold">x2</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
              <TableFooter>
                <TableRow className="pointer-events-none">
                  <TableCell className="text-left" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell className="text-right">{total_points}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default PlayerGameData;
