import classNames from "classnames";
import { PredictionDataResponse } from "learning/app/lib/types";

const getPredictionColour = (prediction: string) => {
  const predictionToNum = +prediction;

  switch (true) {
    case predictionToNum === 0:
      return "bg-gray-500";
    case predictionToNum >= 0 && predictionToNum <= 2.5:
      return "bg-red-700/75";
    case predictionToNum > 2.5 && predictionToNum <= 4:
      return "bg-red-500/75";
    case predictionToNum > 4 && predictionToNum <= 5.5:
      return "bg-green-300/75";
    case predictionToNum > 5.5:
      return "bg-green-500/75";
    default:
      return "bg-gray-800/30";
  }
};

type GameWeekRowProps = {
  player: PredictionDataResponse;
  classnames?: string;
};

const GameWeekRow = ({ player, classnames = "" }: GameWeekRowProps) => {
  return player.data.predictions.slice(0, 4).map((prediction) => {
    const { gw, opp, fitness, predicted_pts } = prediction;

    return (
      <div
        key={gw}
        className={classNames(
          "mb-3 flex items-center justify-between last:mb-0",
          classnames,
        )}
      >
        <div className="flex basis-5/6 flex-col text-left font-semibold">
          <span>Gameweek {gw}</span>
          {fitness < 1 ? (
            <span className="text-sm">
              ({fitness * 100}% chance of playing)
            </span>
          ) : null}
        </div>
        <div className="flex basis-2/5 flex-col justify-end">
          {opp.map((match) => {
            const [team, team_name_location] = match;

            const predicted_pts_fixed = predicted_pts.toFixed(1);

            let team_name = team_name_location;

            if (!team_name) {
              team_name = "None";
            } else {
              team_name = team_name?.includes("(H)")
                ? `${team} (H)`
                : `${team.toUpperCase()} (A)`;
            }

            const predicted_pts_bg = getPredictionColour(predicted_pts_fixed);

            return (
              <div
                key={team_name}
                className={classNames(
                  "mb-1 flex w-full flex-col justify-center p-[6px] text-center font-semibold text-white last:mb-0",
                  predicted_pts_bg,
                )}
              >
                <div>{team_name}</div>
                <div>{predicted_pts_fixed}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

export default GameWeekRow;
