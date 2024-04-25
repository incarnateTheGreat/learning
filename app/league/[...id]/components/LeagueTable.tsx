import { Table, TableBody } from "learning/@/components/ui/Table/Table";
import { Result } from "learning/app/lib/types";

import LeagueTableHeader from "./LeagueTableHeader";
import LeagueTableRow from "./LeagueTableRow";

type LeagueTableProps = {
  results: Result[];
  last_updated_data: string;
};

const LeagueTable = async ({
  results,
  last_updated_data,
}: LeagueTableProps) => {
  return (
    <Table className="mt-4">
      <LeagueTableHeader
        last_updated_data={last_updated_data}
        results={results}
      />

      {results.length === 0 ? <div>Sorry. There are no results.</div> : null}

      <TableBody>
        {results.length > 0
          ? results.map((result: Result) => {
              const key = crypto.randomUUID();

              return <LeagueTableRow key={key} result={result} />;
            })
          : null}
      </TableBody>
    </Table>
  );
};

export default LeagueTable;
