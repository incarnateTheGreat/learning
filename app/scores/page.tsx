import { Suspense } from "react";
import classNames from "classnames";
import { GameWeekFixtures } from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import { TEAMS } from "learning/app/utils/constants";
import { unstable_noStore as noStore } from "next/cache";

import { formatted_kickoff_time, getCurrentEvent } from "../utils";

type GameStatusProps = {
  kickoff_time: string;
  started: boolean;
  finished_provisional: boolean;
};

const GameStatus = ({
  kickoff_time,
  started,
  finished_provisional,
}: GameStatusProps) => {
  if (!started)
    return (
      <div className="w-9 basis-[20%] text-right text-sm md:basis-[40%]">
        {kickoff_time.replace(/, /g, " ")}
      </div>
    );

  if (started && !finished_provisional)
    return <div className="w-9 text-right">L</div>;

  if (finished_provisional) return <div className="w-9 text-right">F</div>;

  return <>&nbsp;</>;
};

async function getScores(currentEvent = 0) {
  try {
    const gameweekFixturesResponse: Response = await fetch(
      `https://fantasy.premierleague.com/api/fixtures/?event=${currentEvent}`,
      { next: { revalidate: 15 } },
    );

    const gameweekFixtures: GameWeekFixtures[] =
      await gameweekFixturesResponse.json();

    return (
      <>
        <h1 className="mb-4 text-2xl">Gameweek {currentEvent}</h1>
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-2">
          {gameweekFixtures.map((game) => {
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
                className={classNames("flex border border-gray-600 px-4 py-2", {
                  "bg-green-900": started && !finished_provisional,
                })}
              >
                <div className="flex basis-full flex-col">
                  <div
                    className={classNames("mr-1 flex w-full", {
                      "font-bold":
                        finished_provisional && team_a_score > team_h_score,
                    })}
                  >
                    <div>{TEAMS[team_a].name}</div>
                    <div className="ml-auto">{team_a_score}</div>
                  </div>
                  <div
                    className={classNames("mr-1 flex w-full", {
                      "font-bold":
                        finished_provisional && team_h_score > team_a_score,
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
                />
              </div>
            );
          })}
        </div>
      </>
    );
  } catch (err) {
    return (
      <div className="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-2">
        Sorry. No scores.
      </div>
    );
  }
}

const Scores = async () => {
  noStore();

  let currentEvent = useEventStore.getState().currentEvent;

  if (!currentEvent) currentEvent = await getCurrentEvent();

  const scores = await getScores(currentEvent);

  return (
    <Suspense fallback={<h2>Loading player...</h2>}>
      <section className="mb-4 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
        {scores}
      </section>
    </Suspense>
  );
};

export default Scores;
