import classNames from "classnames";

import { GameWeekFixtures } from "../lib/types";
import { formatted_kickoff_time } from "../utils";
import { TEAMS } from "../utils/constants";

import GameStatus from "./GameStatus";

type ScoreBlockProps = {
  game: GameWeekFixtures;
  classnames?: string;
  disable_date?: boolean;
};

const ScoreBlock = ({
  game,
  classnames = "",
  disable_date = false,
}: ScoreBlockProps) => {
  const {
    code,
    kickoff_time,
    team_a,
    team_a_score = 0,
    team_h,
    team_h_score = 0,
    started,
    finished_provisional,
  } = game;

  return (
    <div
      key={code}
      className={classNames(
        "flex justify-between border border-gray-600 px-4 py-2",
        classnames,
        {
          "bg-green-900": started && !finished_provisional,
        },
      )}
    >
      <div className="flex basis-full flex-col">
        <div
          className={classNames("mr-1 flex w-full", {
            "font-bold": finished_provisional && team_a_score > team_h_score,
          })}
        >
          <div>{TEAMS[team_a].name}</div>
          <div className="ml-auto">{team_a_score}</div>
        </div>
        <div
          className={classNames("mr-1 flex w-full", {
            "font-bold": finished_provisional && team_h_score > team_a_score,
          })}
        >
          <div>{TEAMS[team_h].name}</div>
          <div className="ml-auto">{team_h_score}</div>
        </div>
      </div>
      <GameStatus
        kickoff_time={formatted_kickoff_time(kickoff_time)}
        started={started}
        finished_provisional={finished_provisional}
        disable_date={disable_date}
      />
    </div>
  );
};

export default ScoreBlock;
