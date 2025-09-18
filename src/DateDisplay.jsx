import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date("1948-05-14T00:00:00");
      const currentDate = new Date();

      let years = currentDate.getFullYear() - targetDate.getFullYear();
      let months = currentDate.getMonth() - targetDate.getMonth();
      let days = currentDate.getDate() - targetDate.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setTimePassed({ years, months, days });
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="reminder">
        <p className="m-0 p-0">
          {timePassed.years} years&nbsp;{timePassed.months}&nbsp;months &nbsp;
          {timePassed.days} days since palestine was occupied
        </p>
      </div>
    </>
  );
}
