import { Suspense } from "react";
import { loadStandings } from "learning/app/lib/actions";
import { unstable_noStore as noStore } from "next/cache";

import NavForm from "./components/NavForm";

type LeagueProps = {
  params: {
    id: number[];
  };
};

const League = async ({ params }: LeagueProps) => {
  noStore();

  const [id, page_number = 1] = params.id;

  const standingsData = await loadStandings(id, page_number);

  const {
    last_updated_data,
    league: { name },
    standings: { results, page, has_next },
  } = standingsData;

  return (
    <Suspense
      fallback={
        <div className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
          <h2>Loading league...</h2>
        </div>
      }
    >
      <NavForm
        page={page}
        id={id}
        has_next={has_next}
        name={name}
        last_updated_data={last_updated_data}
        results={results}
      />
    </Suspense>
  );
};

export default League;
