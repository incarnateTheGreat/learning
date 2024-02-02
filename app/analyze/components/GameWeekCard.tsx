import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "learning/@/components/ui/Card/Card";
import { PredictionDataResponse } from "learning/app/lib/types";

import GameWeekRow from "./GameWeekRow";

type GameWeekCardProps = {
  players: PredictionDataResponse[];
};

const GameWeekCard = ({ players }: GameWeekCardProps) => {
  return players.map((player) => {
    return (
      <Card key={player.code} className="px-2 py-1">
        <CardHeader className="flex w-full p-5 font-semibold">
          <CardTitle className="flex items-center font-semibold">
            {player.fpl.first_name} {player.fpl.second_name}{" "}
            {player.data.status === "i" || player.data.status === "d" ? (
              <ExclamationTriangleIcon className="ml-2" />
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GameWeekRow player={player} />
        </CardContent>
      </Card>
    );
  });
};

export default GameWeekCard;
