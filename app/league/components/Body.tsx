import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "learning/@/components/ui/Tabs/Tabs";
import { GameWeekFixtures, PlayerLiveStats } from "learning/app/lib/types";
import { TEAMS } from "learning/app/utils/constants";

import ImageThumbnail from "./ImageThumbnail";
import TabContent from "./TabContent";

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
  let defaultActiveTab = score_block.findIndex((game) => {
    const { started, finished_provisional } = game;

    if (started && !finished_provisional) {
      return game;
    }
  });

  defaultActiveTab = defaultActiveTab === 1 ? defaultActiveTab : 0;

  return (
    <div className="flex flex-col items-start md:flex-row md:justify-between">
      <ImageThumbnail
        name={`${first_name} ${second_name}`}
        photoExtension={photoExtension}
        imageClassnames="m-auto md:m-0 my-2 h-[200px] w-[200px] md:h-[250px] md:w-[250px] md:my-0"
      />

      <Tabs
        defaultValue={defaultActiveTab.toString()}
        className="flex min-h-[250px] w-full flex-col justify-between border border-gray-600 p-4 md:basis-1/2"
      >
        {score_block.length > 0 ? (
          <TabContent
            is_captain={is_captain}
            score_block={score_block}
            second_name={second_name}
            stats={stats}
          />
        ) : null}

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
