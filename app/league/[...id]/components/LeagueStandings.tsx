import classNames from "classnames";
import { Result } from "learning/app/lib/types";
import { useEventStore } from "learning/app/store/eventStore";
import {
  formatted_last_updated,
  handlePositionArrow,
} from "learning/app/utils";
import Link from "next/link";

type LeagueStandingsProps = {
  results: Result[];
  name: string;
  last_updated_data: string;
};

const LeagueStandings = ({
  results,
  name,
  last_updated_data,
}: LeagueStandingsProps) => {
  const logged_in_user = useEventStore.getState().leagueIDs;

  return (
    <div className="table w-full">
      <h1 className="table-caption text-2xl font-semibold">{name}</h1>
      <h2 className="mb-5 table-caption text-sm">
        Last Updated: {formatted_last_updated(last_updated_data)} (local time)
      </h2>

      {results.length > 0 ? (
        <div className="table-header-group">
          <div className="table-cell pl-2 font-semibold">Rank</div>
          <div className="table-cell font-semibold">Team &amp; Manager</div>
          <div className="table-cell text-center font-semibold">GW</div>
          <div className="table-cell text-center font-semibold">TOT</div>
        </div>
      ) : null}

      {results.length === 0 ? <div>Sorry. There are no results.</div> : null}

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

            const is_logged_in_user = logged_in_user.includes(entry);

            const link = `/player/${entry}`;

            return (
              <div
                key={id}
                className={classNames("table-row ", {
                  "bg-[#592424]": is_logged_in_user,
                  "even:bg-gray-800": !is_logged_in_user,
                })}
              >
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
  );
};

export default LeagueStandings;
