import { loadStandings } from "learning/app/lib/actions";
import { Result } from "learning/app/lib/types";
import {
  formatted_last_updated,
  handlePositionArrow,
} from "learning/app/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type League = {
  params: {
    id: number[];
  };
};

const League = async ({ params }: League) => {
  const [id, page_number = 1] = params.id;

  const standingsData = await loadStandings(id, page_number);
  const {
    last_updated_data,
    league: { name },
    standings: { results, page, has_next },
  } = standingsData;

  console.log(standingsData);

  return (
    <Suspense fallback={<h2>Loading league...</h2>}>
      <article className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
        <div className="flex justify-between">
          {page > 1 ? (
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
              <div className="flex">
                <button>Prev</button>
              </div>
            </form>
          ) : null}

          {has_next ? (
            <form
              className={page === 1 ? "ml-auto" : ""}
              action={async () => {
                "use server";

                let next_page = page;

                if (has_next) {
                  next_page += 1;
                  redirect(`/league/${id}/${next_page}`);
                }
              }}
            >
              <div className="flex">
                <button>Next</button>
              </div>
            </form>
          ) : null}
        </div>

        <div className="table w-full">
          <h1 className="table-caption text-xl font-semibold">{name}</h1>
          <h2 className="mb-2 table-caption">
            Last Updated: {formatted_last_updated(last_updated_data)}
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
                  event_total,
                } = result;

                return (
                  <div key={id} className="table-row odd:bg-gray-800">
                    <div className="table-cell w-[5%] pl-2">
                      <div className="flex">
                        <span className="mr-2 min-w-[14px]">
                          {handlePositionArrow(rank, last_rank)}
                        </span>
                        <span>{rank}</span>
                      </div>
                    </div>
                    <div className="table-cell w-[25%]">
                      {entry_name} / {player_name}
                    </div>
                    <div className="table-cell w-[5%] text-center">
                      {event_total}
                    </div>
                    <div className="table-cell w-[5%] text-center">{total}</div>
                  </div>
                );
              })
            : null}
        </div>
      </article>
    </Suspense>
  );
};

export default League;
