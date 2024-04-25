import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import DateDisplay from "learning/app/components/DateDisplay";
import { Result } from "learning/app/lib/types";

type LeagueTableHeaderProps = {
  results: Result[];
  last_updated_data: string;
};

const LeagueTableHeader = ({
  last_updated_data,
  results,
}: LeagueTableHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default LeagueTableHeader;
