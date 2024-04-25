import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/@/components/ui/Table/Table";
import { ListOfPlayers } from "learning/app/lib/types";

import PlayerTableRow from "./PlayerTableRow";

type TableRowProps = {
  playerData: ListOfPlayers[];
  label: string;
};

const PlayerTable = ({ playerData, label }: TableRowProps) => {
  return (
    <Table className="w-full caption-top">
      <TableHeader>
        <TableRow className="pointer-events-none">
          <TableHead className="px-2 py-1 pt-4 font-semibold text-white">
            {label}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerData?.length > 0 ? (
          playerData.map((player) => {
            const key = crypto.randomUUID();

            return <PlayerTableRow key={key} player={player} />;
          })
        ) : (
          <TableRow>
            <TableCell className="px-2 py-1">None</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PlayerTable;
