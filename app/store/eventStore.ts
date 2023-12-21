import { create } from "zustand";

type EventStoreState = {
  leagueIDs: number[];
  currentEvent: number | null;
  setCurrentEvent: (currentEventToUpdate: number) => void;
};

const useEventStore = create<EventStoreState>((set) => ({
  leagueIDs: [2611380, 6336704, 3243473],
  currentEvent: null,
  setCurrentEvent: (currentEventToUpdate: number) =>
    set(() => ({ currentEvent: currentEventToUpdate })),
}));

export { useEventStore };
