import classNames from "classnames";
import { eventStatus } from "learning/app/lib/actions";

import { useEventStore } from "../store/eventStore";

const handlePositionArrow = (
  entry_rank: number,
  entry_last_rank: number,
  classnames = "",
) => {
  if (entry_rank < entry_last_rank) {
    return (
      <span className={classNames("text-green-400", classnames)}>&#8593;</span>
    );
  } else if (entry_rank === entry_last_rank) {
    return <span>&#x2014;</span>;
  }

  return (
    <span className={classNames("text-red-500", classnames)}>&#8595;</span>
  );
};

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: false,
  minute: "numeric",
  day: "numeric",
  month: "short",
  weekday: "long",
});

const getCurrentEvent = async () => {
  const currentEvent = await eventStatus();

  if (!useEventStore.getState().currentEvent) {
    useEventStore.setState(() => ({
      currentEvent,
    }));
  }

  return currentEvent;
};

const formatted_last_updated = (date: string) =>
  formatter.format(new Date(date));

const kickoff_time_formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: false,
  minute: "numeric",
  month: "short",
  day: "2-digit",
});

const formatted_kickoff_time = (date: string) =>
  kickoff_time_formatter.format(new Date(date));

export {
  formatted_kickoff_time,
  formatted_last_updated,
  getCurrentEvent,
  handlePositionArrow,
};
