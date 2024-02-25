"use client";

interface DateProps {
  date: string;
  timeFormat?: "SHORT" | "DATE";
}

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: false,
  minute: "numeric",
  day: "numeric",
  month: "short",
  weekday: "long",
});

const DateDisplay = ({ date, timeFormat }: DateProps) => {
  const dateVal = new Date(date);
  const localDate = formatter.format(dateVal);

  if (timeFormat === "SHORT") {
    const kickoff_time_data = localDate.split(",").slice(1);

    const kickoff_time_html = kickoff_time_data.map((e, key) => (
      <span key={key}>{e}</span>
    ));

    return <time dateTime={dateVal.toISOString()}>{kickoff_time_html}</time>;
  }

  if (timeFormat === "DATE") {
    const kickoff_time = localDate.split(",").pop();

    return <time dateTime={dateVal.toISOString()}>{kickoff_time}</time>;
  }

  return <time dateTime={dateVal.toISOString()}>{localDate}</time>;
};

export default DateDisplay;
