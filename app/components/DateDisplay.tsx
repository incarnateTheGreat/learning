"use client";

const isToday = (date: Date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

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
  const gameIsToday = isToday(dateVal);

  if (timeFormat === "SHORT") {
    const kickoff_time_data = localDate.split(",").slice(1);

    const kickoff_time_html = kickoff_time_data.map((e, i) => {
      if (i === 0 && gameIsToday) {
        return <span key={i}>Today</span>;
      }

      return <span key={i}>{e}</span>;
    });

    return <time dateTime={dateVal.toISOString()}>{kickoff_time_html}</time>;
  }

  if (timeFormat === "DATE") {
    const kickoff_time = localDate.split(",").pop();

    return <time dateTime={dateVal.toISOString()}>{kickoff_time}</time>;
  }

  return <time dateTime={dateVal.toISOString()}>{localDate}</time>;
};

export default DateDisplay;
