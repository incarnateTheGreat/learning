type GameStatusProps = {
  kickoff_time: string;
  started: boolean;
  finished_provisional: boolean;
};

const GameStatus = ({
  kickoff_time,
  started,
  finished_provisional,
}: GameStatusProps) => {
  if (!started) {
    const kickoff_time_html = kickoff_time
      .split(",")
      .map((e, key) => <span key={key}>{e}</span>);

    return (
      <div className="flex w-9 basis-[40%] flex-col text-right text-sm md:basis-[40%]">
        {kickoff_time_html}
      </div>
    );
  }

  if (started && !finished_provisional)
    return <div className="w-9 text-right">L</div>;

  if (finished_provisional) return <div className="w-9 text-right">F</div>;

  return <>&nbsp;</>;
};

export default GameStatus;
