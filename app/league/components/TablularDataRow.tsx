import classNames from "classnames";
import { TableCell, TableRow } from "learning/@/components/ui/Table/Table";
import { PlayerLiveStats } from "learning/app/lib/types";

type TablurDataRowProps = {
  stats: PlayerLiveStats[];
};

const TabularDataRow = ({ stats }: TablurDataRowProps) => {
  return stats.map((stat) => {
    const { points, value } = stat;
    const identifier = stat.identifier.replace("_", " ");

    return (
      <>
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
      </>
    );
  });
};

export default TabularDataRow;
