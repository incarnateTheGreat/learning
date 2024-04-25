import { unstable_noStore as noStore } from "next/cache";

import LeagueNavigationForm from "./components/LeagueNavigationForm";
import LoadStandingsData from "./LoadStandingsData";

type LeagueProps = {
  params: {
    id: number[];
  };
};

const League = async ({ params }: LeagueProps) => {
  noStore();

  const [id, page_number = 1] = params.id;

  const standingsData = await LoadStandingsData(id, page_number);

  if (!standingsData)
    return (
      <div className="my-4 px-6 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
        Sorry. There is no available league data at this time.
      </div>
    );

  const {
    standings: { new_page, has_next },
  } = standingsData.data;

  const standings = standingsData.standings;

  return (
    <LeagueNavigationForm
      page={new_page}
      id={id}
      has_next={has_next}
      standings={standings}
    />
  );
};

export default League;
