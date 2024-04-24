import { TabsContent } from "learning/@/components/ui/Tabs/Tabs";
import ScoreBlock from "learning/app/components/ScoreBlock";
import { GameWeekFixtures, PlayerLiveStats } from "learning/app/lib/types";
import { calcPlayerPoints } from "learning/app/utils";

import TabularData from "./TabularData";

type TabContentProps = {
  score_block: GameWeekFixtures[];
  stats: PlayerLiveStats[][];
  is_captain: boolean;
  second_name: string;
};

const TabContent = ({
  score_block,
  stats,
  is_captain,
  second_name,
}: TabContentProps) => {
  return score_block.map((game, i) => {
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
  });
};

export default TabContent;
