import { Suspense } from "react";

import LeagueList from "./components/FPL";
import { useEventStore } from "./store/eventStore";

const leagueIDs = useEventStore.getState().leagueIDs;

export default function Home() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      {leagueIDs.map((id) => (
        <LeagueList key={id} id={id} />
      ))}
    </Suspense>
  );
}
