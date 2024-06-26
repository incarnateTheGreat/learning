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

import TabularDataRow from "./TablularDataRow";

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
        <TabularDataRow stats={stats} />
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
