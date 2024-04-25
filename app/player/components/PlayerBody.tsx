import { Toaster } from "learning/@/components/ui/Toaster/Toaster";
import PlayerLoaderButton from "learning/app/components/PlayerLoaderButton/PlayerLoaderButton";
import Players from "learning/app/league/components/Players";
import { PlayerPicksResponse } from "learning/app/lib/types";
import { activeChips } from "learning/app/utils";

type PlayerBodyProps = {
  playerPicks: PlayerPicksResponse;
  rosterResult: {
    starters: any[];
    reserves: any[];
  };
  event_points: number;
  is_live: boolean;
  entry: number;
};

const PlayerBody = ({
  playerPicks,
  rosterResult,
  event_points,
  is_live,
  entry,
}: PlayerBodyProps) => {
  return (
    <>
      <div className="mt-8 flex-1 basis-2/4 md:m-0">
        <Players title="Starting XI" players={rosterResult.starters} />
        <Players title="Reserves" players={rosterResult.reserves} />
      </div>
      <div className="flex flex-1 flex-col items-center md:mt-10 md:basis-2/4 md:items-center">
        {playerPicks.active_chip ? (
          <h3 className="text-md mb-4 bg-gray-900 px-4 py-2 font-semibold capitalize text-green-600">
            {activeChips(playerPicks.active_chip)}
          </h3>
        ) : null}
        <div className="rounded-2xl border-2 border-white bg-gray-900 p-10 text-7xl font-semibold">
          {event_points}
        </div>
        {is_live ? (
          <>
            <PlayerLoaderButton entry={entry} classnames="my-4" />
            <div className="text-md bg-gray-900 px-4 py-2 font-semibold uppercase text-green-600">
              Live
            </div>
          </>
        ) : null}
      </div>
      <Toaster />
    </>
  );
};

export default PlayerBody;
