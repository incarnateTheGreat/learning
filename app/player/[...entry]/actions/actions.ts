"use server";

import { redirect } from "next/navigation";

const refreshPlayerData = async (entry: number) => {
  redirect(`/player/${entry}`);
};

export { refreshPlayerData };
