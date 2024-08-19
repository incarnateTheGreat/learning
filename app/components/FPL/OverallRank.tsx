import { LeagueData } from "learning/app/lib/types";
import { handlePositionArrow, numFormatter } from "learning/app/utils";

type OverallRankProps = {
  classicLeagueData: LeagueData[];
  summary_overall_rank: number;
};

const OverallRank = ({
  classicLeagueData,
  summary_overall_rank,
}: OverallRankProps) => {
  const {
    entry_rank: overall_entry_rank,
    entry_last_rank: overall_entry_last_rank,
  } = classicLeagueData.find((league) => league.name === "Overall");

  return (
    <div className="mb-2 mt-4 rounded bg-[#0c1b42] px-6 py-2">
      <span className="text-md font-semibold">Overall:</span>
      <span className="ml-2">
        {summary_overall_rank ? numFormatter(summary_overall_rank) : "--"}
        {summary_overall_rank ? (
          <span className="ml-2">
            {handlePositionArrow(
              overall_entry_rank,
              overall_entry_last_rank,
              "ml-1",
            )}
          </span>
        ) : null}
      </span>
    </div>
  );
};

export default OverallRank;
