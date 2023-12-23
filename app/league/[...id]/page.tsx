import { Suspense } from "react";
import { StandingsResponse } from "learning/app/lib/types";
import { unstable_noStore as noStore } from "next/cache";

import LeagueNavigationForm from "./components/LeagueNavigationForm";
import LeagueStandings from "./components/LeagueStandings";

type LeagueProps = {
  params: {
    id: number[];
  };
};

async function loadStandings(id: number, page_number = 1) {
  try {
    const res: Response = await fetch(
      `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings?page_standings=${page_number}`,
    );

    const standingsData: StandingsResponse = await res.json();

    const {
      last_updated_data,
      league: { name },
      standings: { page, results, has_next },
    } = standingsData;

    return {
      data: {
        standings: { new_page: page, has_next },
      },
      standings: (
        <LeagueStandings
          results={results}
          last_updated_data={last_updated_data}
          name={name}
        />
      ),
    };
  } catch (err) {
    return;
  }
}

const League = async ({ params }: LeagueProps) => {
  noStore();

  const [id, page_number = 1] = params.id;

  const standingsData = await loadStandings(id, page_number);

  const {
    standings: { new_page, has_next },
  } = standingsData.data;

  const standings = standingsData.standings;

  return (
    <Suspense
      fallback={
        <div className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
          <h2>Loading league...</h2>
        </div>
      }
    >
      <LeagueNavigationForm
        page={new_page}
        id={id}
        has_next={has_next}
        standings={standings}
      />
    </Suspense>
  );
};

export default League;
