import { unstable_noStore as noStore } from "next/cache";
import { loadStandings } from "learning/app/lib/actions";
import { Result } from "learning/app/lib/types";
import {
  formatted_last_updated,
  handlePositionArrow,
} from "learning/app/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type LeagueProps = {
  params: {
    id: number[];
  };
};

type NavButtonProps = {
  page: number;
  id: number;
};

const PrevButton = async ({ page, id }: NavButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";

        let prev_page = page;

        prev_page -= 1;

        if (prev_page === 1) {
          redirect(`/league/${id}`);
        } else {
          redirect(`/league/${id}/${prev_page}`);
        }
      }}
    >
      <button>Prev</button>
    </form>
  );
};

const NextButton = async ({ page, id }: NavButtonProps) => {
  return (
    <form
      className={page === 1 ? "ml-auto" : ""}
      action={async () => {
        "use server";

        let next_page = page;

        next_page += 1;

        redirect(`/league/${id}/${next_page}`);
      }}
    >
      <button>Next</button>
    </form>
  );
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
      <section className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        <Link href="/" className="mb-8 flex">
          &laquo; Back to Home
        </Link>
        <div className="flex justify-between">
          {page > 1 ? <PrevButton page={page} id={id} /> : null}
          {has_next ? <NextButton page={page} id={id} /> : null}
        </div>

        <div className="table w-full">
          <h1 className="table-caption text-2xl font-semibold">{name}</h1>
          <h2 className="mb-5 table-caption text-sm">
            Last Updated: {formatted_last_updated(last_updated_data)} (local
            time)
          </h2>

          {results.length > 0 ? (
            <div className="table-header-group">
              <div className="table-cell pl-2 font-semibold">Rank</div>
              <div className="table-cell font-semibold">Team &amp; Manager</div>
              <div className="table-cell text-center font-semibold">GW</div>
              <div className="table-cell text-center font-semibold">TOT</div>
            </div>
          ) : null}

          {results.length === 0 ? (
            <div>Sorry. There are no results.</div>
          ) : null}

          {results.length > 0
            ? results.map((result: Result) => {
                const {
                  id,
                  player_name,
                  entry_name,
                  rank,
                  last_rank,
                  total,
                  entry,
                  event_total,
                } = result;

                const link = `/player/${entry}`;

                return (
                  <div key={id} className="table-row even:bg-gray-800">
                    <div className="table-cell w-[5%] pl-2">
                      <div className="flex">
                        <span className="mr-2 min-w-[14px]">
                          {handlePositionArrow(rank, last_rank)}
                        </span>
                        <span>{rank}</span>
                      </div>
                    </div>
                    <Link
                      href={link}
                      className="table-cell w-[25%] hover:text-gray-300"
                    >
                      {entry_name} / {player_name}
                    </Link>
                    <div className="table-cell w-[5%] text-center">
                      {event_total}
                    </div>
                    <div className="table-cell w-[5%] text-center">{total}</div>
                  </div>
                );
              })
            : null}
        </div>
      </section>
    </Suspense>
  );
};

export default League;
