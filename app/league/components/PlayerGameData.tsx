import classNames from "classnames";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "learning/@/components/ui/Tabs/Tabs";
import ScoreBlock from "learning/app/components/ScoreBlock";
import { GameWeekFixtures, PlayerLiveStats } from "learning/app/lib/types";
import { calcPlayerPoints } from "learning/app/utils";
import { TEAMS } from "learning/app/utils/constants";

import ImageThumbnail from "./ImageThumbnail";

type TablurDataProps = {
  stats: PlayerLiveStats[];
  is_captain: boolean;
  total_points: number;
  classnames?: string;
};

const TabularData = ({
  stats,
  is_captain,
  total_points,
  classnames = "",
}: TablurDataProps) => {
  return (
    <Table className={classNames("mb-4 w-full md:ml-auto", classnames)}>
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
              className={classNames("pointer-events-none", {
                "text-yellow-400": identifier === "yellow cards",
                "text-red-600": identifier === "red cards",
              })}
              key={identifier}
            >
              <TableCell className="w-1/2 text-left font-semibold capitalize">
                {identifier}
              </TableCell>
              <TableCell className="text-right">{value}</TableCell>
              <TableCell className="text-right">{points}</TableCell>
            </TableRow>
          );
        })}
        {is_captain ? (
          <TableRow className="pointer-events-none bg-slate-900">
            <TableCell className="text-left font-semibold" colSpan={2}>
              Captain
            </TableCell>
            <TableCell className="text-right font-semibold">x2</TableCell>
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
  );
};

type PlayerGameDataProps = {
  web_name: string;
  first_name: string;
  second_name: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  team_name: string;
  score_block: GameWeekFixtures[];
  photoExtension: string;
  stats: PlayerLiveStats[][];
  total_points: number;
  has_match_started: boolean;
  player_team: number;
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
  player_team,
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
            <div className="my-2 md:mt-0">
              <span className="mr-2 text-5xl font-semibold">
                {total_points}
              </span>
              <span>pts.</span>
            </div>
          </div>
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <ImageThumbnail
              name={`${first_name} ${second_name}`}
              photoExtension={photoExtension}
            />

            <Tabs
              defaultValue={"0"}
              className="w-full border border-gray-600 p-4 md:basis-1/2"
            >
              {score_block.length > 0
                ? score_block.map((game, i) => {
                    const points = stats[i].reduce((acc, elem) => {
                      acc += elem.points;

                      return acc;
                    }, 0);

                    const player_total_points = calcPlayerPoints(
                      points,
                      is_captain,
                    );

                    return (
                      <TabsContent
                        key={i}
                        value={i.toString()}
                        className="mt-0"
                      >
                        <ScoreBlock
                          key={game.code}
                          timeFormat="SHORT"
                          game={game}
                          classnames="mt-4 md:mb-2 md:mt-0 min-w-[300px] md:min-w-[300px]"
                        />

                        <TabularData
                          classnames="last:mb-0"
                          key={second_name}
                          stats={stats[i]}
                          is_captain={is_captain}
                          total_points={player_total_points}
                        />
                      </TabsContent>
                    );
                  })
                : null}

              {score_block.length > 1 ? (
                <TabsList className="mt-4 flex w-full p-0">
                  {score_block.map((game, i) => {
                    const opponent =
                      game.team_h === player_team
                        ? TEAMS[game.team_a].short_name
                        : TEAMS[game.team_h].short_name;

                    return (
                      <TabsTrigger
                        key={i}
                        value={i.toString()}
                        className="h-full flex-1"
                      >
                        v. {opponent}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              ) : null}
            </Tabs>

            {/* {score_block !== undefined && !score_block?.started ? (
              <div className="w-full text-center md:ml-auto md:max-w-[60%] md:text-right">
                The player&rsquo;s game has not started.
              </div>
            ) : null}

            {score_block === undefined ? (
              <div className="w-full text-center md:ml-auto md:max-w-[60%] md:text-right">
                This player is not active in this gameweek.
              </div>
            ) : null} */}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default PlayerGameData;
