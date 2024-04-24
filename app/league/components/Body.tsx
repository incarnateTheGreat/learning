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
import TabularData from "./TabularData";

type BodyProps = {
  first_name: string;
  second_name: string;
  photoExtension: string;
  is_captain: boolean;
  score_block: GameWeekFixtures[];
  stats: PlayerLiveStats[][];
  player_team: number;
};

const Body = ({
  first_name,
  second_name,
  photoExtension,
  is_captain,
  score_block,
  player_team,
  stats,
}: BodyProps) => {
  return (
    <div className="flex flex-col items-start md:flex-row md:justify-between">
      <ImageThumbnail
        name={`${first_name} ${second_name}`}
        photoExtension={photoExtension}
        imageClassnames="m-auto md:m-0 my-2 h-[200px] w-[200px] md:h-[250px] md:w-[250px] md:my-0"
      />

      <Tabs
        defaultValue={"0"}
        className="flex min-h-[250px] w-full flex-col justify-between border border-gray-600 p-4 md:basis-1/2"
      >
        {score_block.length > 0
          ? score_block.map((game, i) => {
              const { started } = game;

              const points = stats[i].reduce((acc, elem) => {
                acc += elem.points;

                return acc;
              }, 0);

              const player_total_points = calcPlayerPoints(points, is_captain);

              return (
                <TabsContent key={i} value={i.toString()} className="mt-0">
                  <ScoreBlock
                    key={game.code}
                    timeFormat="SHORT"
                    game={game}
                    classnames="mt-4 md:mb-2 md:mt-0 min-w-[300px] md:min-w-[300px]"
                  />

                  {started ? (
                    <TabularData
                      classnames="last:mb-0"
                      key={second_name}
                      stats={stats[i]}
                      is_captain={is_captain}
                      total_points={player_total_points}
                    />
                  ) : null}
                </TabsContent>
              );
            })
          : null}

        {score_block.length > 1 ? (
          <TabsList className="mt-4">
            {score_block.map((game, i) => {
              const opponent =
                game.team_h === player_team
                  ? TEAMS[game.team_a].short_name
                  : TEAMS[game.team_h].short_name;

              return (
                <TabsTrigger
                  key={i}
                  value={i.toString()}
                  className="h-full flex-1 border"
                >
                  v. {opponent}
                </TabsTrigger>
              );
            })}
          </TabsList>
        ) : null}

        {score_block.length === 0 ? (
          <div className="w-full text-center md:ml-auto md:text-right">
            This player has no active data.
          </div>
        ) : null}
      </Tabs>
    </div>
  );
};

export default Body;
