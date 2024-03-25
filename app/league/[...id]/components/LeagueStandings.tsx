import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import DateDisplay from "learning/app/components/DateDisplay";
import { Result } from "learning/app/lib/types";
import { getFPLIds, handlePositionArrow } from "learning/app/utils";
import Link from "next/link";

type LeagueStandingsProps = {
  results: Result[];
  name: string;
  last_updated_data: string;
};

const LeagueStandings = async ({
  results,
  name,
  last_updated_data,
}: LeagueStandingsProps) => {
  const fplIds = await getFPLIds();

  return (
    <>
      <h1 className="border-b border-b-slate-500 text-2xl font-semibold">
        {name}
      </h1>
      <h2 className="mt-1.5 text-sm">
        <span className="font-semibold">Last Updated: </span>
        <DateDisplay date={last_updated_data} /> (local time)
      </h2>
      <Table className="mt-4">
        <TableCaption>
          <span className="font-semibold">Last Updated: </span>
          <DateDisplay date={last_updated_data} /> (local time)
        </TableCaption>
        {results.length > 0 ? (
          <TableHeader>
            <TableRow className="pointer-events-none">
              <TableHead>Rank</TableHead>
              <TableHead className="w-[75%]">Team / Manager</TableHead>
              <TableHead className="w-[10%] p-0 text-center">GW</TableHead>
              <TableHead className="w-0 p-0 text-center">TOT</TableHead>
            </TableRow>
          </TableHeader>
        ) : null}

        {results.length === 0 ? <div>Sorry. There are no results.</div> : null}

        <TableBody>
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

                const is_logged_in_user = fplIds.includes(entry);

                const link = `/player/${entry}`;

                return (
                  <TableRow
                    key={id}
                    className={classNames("overflow-hidden", {
                      "bg-[#431919]": is_logged_in_user,
                      "odd:bg-gray-900": !is_logged_in_user,
                    })}
                  >
                    <TableCell className="p-0">
                      <Link href={link} className="flex flex-1 p-2">
                        <span className="mr-2 min-w-[14px]">
                          {handlePositionArrow(rank, last_rank)}
                        </span>
                        <span>{rank}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="p-0">
                      <Link href={link} className="flex flex-1 p-2">
                        {entry_name} / {player_name}
                      </Link>
                    </TableCell>
                    <TableCell className="p-0">
                      <Link
                        href={link}
                        className="flex flex-1 justify-center p-2"
                      >
                        {event_total}
                      </Link>
                    </TableCell>
                    <TableCell className="p-0">
                      <Link
                        href={link}
                        className="flex flex-1 justify-center p-2"
                      >
                        {total}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default LeagueStandings;
