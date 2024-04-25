import classNames from "classnames";
import { TableCell, TableRow } from "learning/@/components/ui/Table/Table";
import { Result } from "learning/app/lib/types";
import { getFPLIds, handlePositionArrow } from "learning/app/utils";
import Link from "next/link";

type LeagueTableRowProps = {
  result: Result;
};

const LeagueTableRow = async ({ result }: LeagueTableRowProps) => {
  const fplIds = await getFPLIds();

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
        <Link href={link} className="flex flex-1 justify-center p-2">
          {event_total}
        </Link>
      </TableCell>
      <TableCell className="p-0">
        <Link href={link} className="flex flex-1 justify-center p-2">
          {total}
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default LeagueTableRow;
