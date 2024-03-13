"use server";

import { redirect } from "next/navigation";

const refreshScoresData = async (gameweek: string) => {
  redirect(`/scores/${gameweek}`);
};

export { refreshScoresData };
