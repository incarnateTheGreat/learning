import { Suspense } from "react";

import LeagueList from "./components/FPL";
import { useEventStore } from "./store/eventStore";

const leagueIDs = useEventStore.getState().leagueIDs;

export default function Home() {
  return (
    <main className="flex flex-col p-6 md:flex-row">
      <Suspense fallback={<h2>Loading...</h2>}>
        {leagueIDs.map((id) => (
          <LeagueList key={id} id={id} />
        ))}
      </Suspense>
    </main>
  );
}
