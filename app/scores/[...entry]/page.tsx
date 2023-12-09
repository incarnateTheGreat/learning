import { Suspense } from "react";
import { GameWeekFixtures } from "learning/app/lib/types";
import { TEAMS } from "learning/app/utils/constants";

type ScoresProps = {
  params: { entry: number[] };
};

type GameStatusProps = {
  started: boolean;
  finished_provisional: boolean;
  minutes: number;
};

const GameStatus = ({
  started,
  finished_provisional,
  minutes,
}: GameStatusProps) => {
  if (!started) return <div className="w-9 text-right">&nbsp;</div>;

  if (started && !finished_provisional)
    return <div className="w-9 text-right">{minutes}</div>;

  if (finished_provisional) return <div className="w-9 text-right">F</div>;

  return <>&nbsp;</>;
};

async function getScores(currentEvent = 0) {
  const gameweekFixturesResponse: Response = await fetch(
    `https://fantasy.premierleague.com/api/fixtures/?event=${currentEvent}`,
    { next: { revalidate: 15 } },
  );

  const gameweekFixtures: GameWeekFixtures[] =
    await gameweekFixturesResponse.json();

  return (
    <div className="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-2">
      {gameweekFixtures.map((game) => {
        const {
          code,
          team_a,
          team_a_score,
          team_h,
          team_h_score,
          minutes,
          started,
          finished_provisional,
        } = game;

        return (
          <div key={code} className="border border-gray-600 px-4 py-2">
            <div className="flex justify-between">
              <div className="mr-1 flex w-full">
                <div>{TEAMS[team_a].name}</div>
                <div className="ml-auto">{team_a_score}</div>
              </div>
              <GameStatus
                minutes={minutes}
                started={started}
                finished_provisional={finished_provisional}
              />
            </div>
            <div className="flex justify-between">
              <div className="mr-1 flex w-full">
                <div>{TEAMS[team_h].name}</div>
                <div className="ml-auto">{team_h_score}</div>
              </div>
              <div className="w-9 text-right">&nbsp;</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Scores = async ({ params: { entry } }: ScoresProps) => {
  const scores = await getScores(entry.at(0));

  return (
    <Suspense fallback={<h2>Loading player...</h2>}>
      <section className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        <h1 className="mb-4 text-2xl">Gameweek {entry.at(0)}</h1>
        {scores}
      </section>
    </Suspense>
  );
};

export default Scores;
