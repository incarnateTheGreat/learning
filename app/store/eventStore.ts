import { create } from "zustand";

type EventStoreState = {
  currentEvent: number | null;
  setCurrentEvent: (currentEventToUpdate: number) => void;
};

const useEventStore = create<EventStoreState>((set) => ({
  currentEvent: null,
  setCurrentEvent: (currentEventToUpdate: number) =>
    set(() => ({ currentEvent: currentEventToUpdate })),
}));

export { useEventStore };
