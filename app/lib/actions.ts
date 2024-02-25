"use server";

import { EventStatusResponse } from "./types";

const eventStatus = async () => {
  try {
    const res: Response = await fetch(
      "https://fantasy.premierleague.com/api/event-status/",
      {
        cache: "no-cache",
      },
    );

    const resJson: EventStatusResponse = await res.json();

    return resJson?.status?.[0].event;
  } catch (err) {
    return 0;
  }
};

export { eventStatus };
