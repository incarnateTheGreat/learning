import DateDisplay from "./DateDisplay";

type GameStatusProps = {
  kickoff_time: string;
  started: boolean;
  finished_provisional: boolean;
  timeFormat?: "SHORT" | "DATE";
};

const GameStatus = ({
  kickoff_time,
  started,
  finished_provisional,
  timeFormat,
}: GameStatusProps) => {
  if (!started) {
    return (
      <div className="flex w-9 basis-[40%] flex-col text-right text-sm md:basis-[40%]">
        <DateDisplay timeFormat={timeFormat} date={kickoff_time} />
      </div>
    );
  }

  if (started && !finished_provisional)
    return <div className="w-9 text-right">L</div>;

  if (finished_provisional) return <div className="w-9 text-right">F</div>;

  return <>&nbsp;</>;
};

export default GameStatus;
