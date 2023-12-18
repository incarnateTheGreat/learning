import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ListOfPlayersResponse } from "../lib/types";

type StaticStoreState = {
  listOfAllPlayers: ListOfPlayersResponse | null;
  setListOfAllPlayers: (playersToAdd: ListOfPlayersResponse) => void;
};

const useStaticStore = create(
  persist<StaticStoreState>(
    (set) => ({
      listOfAllPlayers: null,
      setListOfAllPlayers: (playersToAdd) =>
        set(() => {
          return {
            listOfAllPlayers: playersToAdd,
          };
        }),
    }),
    {
      name: "listOfAllPlayers",
    },
  ),
);

export default useStaticStore;
