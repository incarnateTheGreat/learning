import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "learning/@/components/ui/Drawer/Drawer";
import { GameWeekFixtures, PlayerLiveStats } from "learning/app/lib/types";

import Body from "./Body";
import Header from "./Header";

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
      <DrawerTrigger className="ml-4 flex w-full items-center justify-between">
        <div>
          {web_name}{" "}
          <span className="text-sm font-semibold text-gray-200">
            ({team_name}) {is_captain ? "(C)" : null}{" "}
            {is_vice_captain ? "(V)" : null}
          </span>
        </div>
        <span className="ml-3 text-right text-2xl font-semibold">
          {has_match_started ? total_points : "-"}
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="m-auto flex w-full flex-col md:w-[800px]">
          <Header
            first_name={first_name}
            second_name={second_name}
            is_captain={is_captain}
            team_name={team_name}
            total_points={total_points}
          />
          <Body
            first_name={first_name}
            second_name={second_name}
            photoExtension={photoExtension}
            is_captain={is_captain}
            score_block={score_block}
            stats={stats}
            player_team={player_team}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default PlayerGameData;
