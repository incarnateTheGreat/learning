import { Suspense } from "react";
import { GameWeekFixtures } from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import { unstable_noStore as noStore } from "next/cache";

import Loading from "../components/Loading/Loading";
import ScoreBlock from "../components/ScoreBlock";
import { formatted_score_date, getCurrentEvent } from "../utils";

async function getScores(currentEvent = 0) {
  try {
    const gameweekFixturesResponse: Response = await fetch(
      `https://fantasy.premierleague.com/api/fixtures/?event=${currentEvent}`,
      { next: { revalidate: 15 } },
    );

    let gameweekFixtures: GameWeekFixtures[] =
      await gameweekFixturesResponse.json();

    gameweekFixtures = gameweekFixtures.reduce((acc, elem) => {
      elem["date"] = formatted_score_date(elem.kickoff_time);

      acc.push(elem);

      return acc;
    }, []);

    const gameweekFixturesByDate = Object.groupBy(
      gameweekFixtures,
      ({ date }: GameWeekFixtures) => date,
    );

    return (
      <>
        <h1 className="mb-4 text-2xl">Gameweek {currentEvent}</h1>
        <div className="grid gap-y-2 md:gap-8">
          {Object.keys(gameweekFixturesByDate).map((title) => {
            return (
              <div key={title}>
                <h2 className="mb-2 font-semibold">{title}</h2>

                {gameweekFixturesByDate[title].map((game: GameWeekFixtures) => {
                  return (
                    <ScoreBlock
                      key={game.code}
                      game={game}
                      classnames="mb-2"
                      disable_date
                    />
                  );
                })}
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
    <Suspense fallback={<Loading type="page" />}>
      <section className="my-4 w-full px-6 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
        {scores}
      </section>
    </Suspense>
  );
};

export default Scores;
