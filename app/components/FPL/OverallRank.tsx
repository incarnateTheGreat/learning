import { handlePositionArrow, numFormatter } from "learning/app/utils";

type OverallRankProps = {
  summary_overall_rank: number;
  overall_entry_rank: number;
  overall_entry_last_rank: number;
};

const OverallRank = ({
  summary_overall_rank,
  overall_entry_rank,
  overall_entry_last_rank,
}: OverallRankProps) => {
  return (
    <div className="mb-2 mt-4 rounded bg-[#0c1b42] px-6 py-2">
      <span className="text-md font-semibold">Overall:</span>
      <span className="ml-2">
        {numFormatter(summary_overall_rank)}
        {handlePositionArrow(
          overall_entry_rank,
          overall_entry_last_rank,
          "ml-1",
        )}
      </span>
    </div>
  );
};

export default OverallRank;
