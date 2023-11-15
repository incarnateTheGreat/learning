const handlePositionArrow = (entry_rank: number, entry_last_rank: number) => {
  if (entry_rank < entry_last_rank) {
    return <span className="text-green-400">&#8593;</span>;
  } else if (entry_rank === entry_last_rank) {
    return <span>&#x2014;</span>;
  }

  return <span className="text-red-500">&#8595;</span>;
};

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: false,
  minute: "numeric",
  day: "numeric",
  month: "short",
  weekday: "long",
});

const formatted_last_updated = (date: string) =>
  formatter.format(new Date(date));

export { handlePositionArrow, formatted_last_updated };
