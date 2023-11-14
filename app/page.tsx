import { Suspense } from "react";
import LeagueList from "./components/FPL";

const leagueIDs = [2611380, 6336704, 3243473];

export default function Home() {
  return (
    <main className="flex p-6">
      <Suspense fallback={<h2>Loading...</h2>}>
        {leagueIDs.map((id) => (
          <LeagueList key={id} id={id} />
        ))}
      </Suspense>
    </main>
  );
}
