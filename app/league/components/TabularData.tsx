import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import { PlayerLiveStats } from "learning/app/lib/types";

type TablurDataProps = {
  stats: PlayerLiveStats[];
  is_captain: boolean;
  total_points: number;
  classnames?: string;
};

const TabularData = ({
  stats,
  is_captain,
  total_points,
  classnames = "",
}: TablurDataProps) => {
  return (
    <Table className={classNames("mb-4 w-full md:ml-auto", classnames)}>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead>&nbsp;</TableHead>
          <TableHead className="text-right">Value</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((stat) => {
          const { points, value } = stat;
          const identifier = stat.identifier.replace("_", " ");

          return (
            <TableRow
              className={classNames("pointer-events-none", {
                "text-yellow-400": identifier === "yellow cards",
                "text-red-600": identifier === "red cards",
              })}
              key={identifier}
            >
              <TableCell className="w-1/2 text-left font-semibold capitalize">
                {identifier}
              </TableCell>
              <TableCell className="text-right">{value}</TableCell>
              <TableCell className="text-right">{points}</TableCell>
            </TableRow>
          );
        })}
        {is_captain ? (
          <TableRow className="pointer-events-none bg-slate-900">
            <TableCell className="text-left font-semibold" colSpan={2}>
              Captain
            </TableCell>
            <TableCell className="text-right font-semibold">x2</TableCell>
          </TableRow>
        ) : null}
      </TableBody>
      <TableFooter>
        <TableRow className="pointer-events-none">
          <TableCell className="text-left" colSpan={2}>
            Total
          </TableCell>
          <TableCell className="text-right">{total_points}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TabularData;
