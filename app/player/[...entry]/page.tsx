import { unstable_noStore as noStore } from "next/cache";

import GetPlayersData from "../components/GetPlayersData";

type PlayerProps = {
  params: { entry: number[] };
};

const Player = async ({ params: { entry } }: PlayerProps) => {
  noStore();

  const players = await GetPlayersData(entry.at(0));

  return (
    <section className="my-4 w-full px-6 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
      {players}
    </section>
  );
};

export default Player;
