import { create } from "zustand";

type EventStoreState = {
  fplIds: number[];
  currentEvent: number | null;
  setCurrentEvent: (currentEventToUpdate: number) => void;
  setLeagueIDs: (fplIdsToUpdate: number[]) => void;
};

const useEventStore = create<EventStoreState>((set) => ({
  fplIds: [],
  currentEvent: null,
  setCurrentEvent: (currentEventToUpdate: number) =>
    set(() => ({ currentEvent: currentEventToUpdate })),
  setLeagueIDs: (fplIdsToUpdate: number[]) =>
    set(() => ({
      fplIds: fplIdsToUpdate,
    })),
}));

export { useEventStore };
