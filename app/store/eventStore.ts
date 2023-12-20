import { create } from "zustand";

type EventStoreState = {
  leagueIDs: number[];
  currentEvent: number | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCurrentEvent: (currentEventToUpdate: number) => void;
};

const useEventStore = create<EventStoreState>((set) => ({
  leagueIDs: [2611380, 6336704, 3243473],
  currentEvent: null,
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading: !loading })),
  setCurrentEvent: (currentEventToUpdate: number) =>
    set(() => ({ currentEvent: currentEventToUpdate })),
}));

export { useEventStore };
