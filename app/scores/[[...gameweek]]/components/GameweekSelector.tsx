"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "learning/@/components/ui/Select/Select";

import { refreshScoresData } from "../actions/actions";

type GameweekSelectorProps = {
  defaultGameWeek: string;
};

const GameweekSelector = ({ defaultGameWeek = "" }: GameweekSelectorProps) => {
  const [_, startTransition] = useTransition();

  return (
    <div className="flex justify-end">
      <Select
        defaultValue={defaultGameWeek.toString()}
        onValueChange={(entry) => {
          startTransition(async () => {
            await refreshScoresData(entry);
          });
        }}
      >
        <SelectTrigger className="w-[180px]" data-testid="gameweek_selector">
          <SelectValue placeholder="Gameweek" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(38)].map((_, i) => {
            const value = i + 1;

            return (
              <SelectItem
                data-testid={`gameweek_${value}`}
                key={value}
                value={value.toString()}
                className="cursor-pointer"
              >
                Gameweek {value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GameweekSelector;
