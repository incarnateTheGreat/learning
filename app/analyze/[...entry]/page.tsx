import { useEventStore } from "learning/app/store/eventStore";
import { getCurrentEvent } from "learning/app/utils";

import { getAnalyzeData, getPredictionData } from "../api";
import GameWeekCard from "../components/GameWeekCard";
import PlayerSearchInput from "../components/PlayerSearchInput";

type AnalyzeEntryProps = {
  params: { entry: number };
};

const AnalyzeEntry = async ({ params: { entry } }: AnalyzeEntryProps) => {
  let currentEvent = useEventStore.getState().currentEvent;

  if (!currentEvent) currentEvent = await getCurrentEvent();

  const players = await getAnalyzeData(entry, currentEvent);
  const predictionData = await getPredictionData();

  return (
    <section className="relative my-4 w-full px-6 text-sm md:mx-auto md:max-w-[800px] md:text-base">
      <PlayerSearchInput data={predictionData} />
      {players.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <GameWeekCard players={players} />
        </div>
      ) : (
        <>Huh? No list of Players.</>
      )}
    </section>
  );
};

export default AnalyzeEntry;
