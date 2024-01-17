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
import ScoreBlock from "learning/app/components/ScoreBlock";
import { GameWeekFixtures, PlayerLiveStats } from "learning/app/lib/types";

import ImageThumbnail from "./ImageThumbnail";

type PlayerGameDataProps = {
  web_name: string;
  first_name: string;
  second_name: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  team_name: string;
  score_block: GameWeekFixtures;
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
  score_block,
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
            <ScoreBlock
              game={score_block}
              classnames="mt-4 md:mb-2 md:mt-0 min-w-[300px] md:min-w-[300px]"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <ImageThumbnail
              name={`${first_name} ${second_name}`}
              photoExtension={photoExtension}
            />
            {score_block.started ? (
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
                      <TableRow
                        className="pointer-events-none"
                        key={identifier}
                      >
                        <TableCell className="text-left font-semibold capitalize">
                          {identifier}
                        </TableCell>
                        <TableCell className="text-right">{value}</TableCell>
                        <TableCell className="text-right">{points}</TableCell>
                      </TableRow>
                    );
                  })}
                  {is_captain ? (
                    <TableRow className="pointer-events-none bg-slate-900">
                      <TableCell
                        className="text-left font-semibold"
                        colSpan={2}
                      >
                        Captain
                      </TableCell>
                      <TableCell className="text-right font-semibold">
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
                    <TableCell className="text-right">{total_points}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <div className="w-full text-center md:ml-auto md:max-w-[60%] md:text-right">
                The player&rsquo;s game has not started.
              </div>
            )}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default PlayerGameData;
