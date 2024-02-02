import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "learning/@/components/ui/Drawer/Drawer";
import { PredictionDataResponse } from "learning/app/lib/types";

import GameWeekRow from "./GameWeekRow";

type PlayerSearchResultsProps = {
  data: PredictionDataResponse[];
};

const PlayerSearchResults = ({ data }: PlayerSearchResultsProps) => {
  return (
    <div
      id="searchResults"
      className="absolute z-10 flex w-full flex-col items-start bg-background"
    >
      {data.slice(0, 10).map((result) => {
        const {
          code,
          fpl: { first_name, second_name },
          team: { name },
        } = result;

        return (
          <Drawer key={code}>
            <DrawerTrigger className="w-full px-2 text-left text-foreground/90 transition-colors hover:text-foreground/80 focus:text-foreground/80">
              {first_name} {second_name}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="flex w-full flex-col gap-0 md:m-auto md:w-[800px]">
                <DrawerTitle className="text-3xl font-normal">
                  <span>{first_name}</span>{" "}
                  <span className="font-semibold">{second_name}</span>
                </DrawerTitle>
                <DrawerDescription className="text-center md:text-left">
                  {name}
                </DrawerDescription>
                <div className="mt-4">
                  <GameWeekRow player={result} />
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  );
};

export default PlayerSearchResults;
