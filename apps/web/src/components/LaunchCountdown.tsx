import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Launch.module.css";

interface ClockProps {
  date: string;
}

function LaunchCountdown({ date }: ClockProps) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const timeLeft = useMemo(() => {
    const launchTime = new Date(date).getTime();
    const distance = launchTime - time;

    const days = `${Math.abs(
      Math.floor(distance / (1000 * 60 * 60 * 24))
    )}`.padStart(2, "0");
    const hours = `${Math.abs(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    )}`.padStart(2, "0");
    const minutes = `${Math.abs(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    )}`.padStart(2, "0");
    const seconds = `${Math.abs(
      Math.floor((distance % (1000 * 60)) / 1000)
    )}`.padStart(2, "0");

    return {
      days,
      hours,
      minutes,
      seconds,
      distance,
    };
  }, [date, time]);

  return (
    <span className={styles.launch_date}>
      T{Math.sign(timeLeft.distance) === 1 ? "-" : "+"}
      {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </span>
  );
}

export default LaunchCountdown;
