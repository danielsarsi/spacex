import LaunchCountdown from "./LaunchCountdown";
import styles from "../styles/Launch.module.css";
import { LaunchDatePrecision } from "schemas";

interface LaunchProps {
  name: string;
  date: string;
  datePrecision: LaunchDatePrecision;
  category?: string;
  success: boolean | null;
}

function Launch({ name, date, datePrecision, category, success }: LaunchProps) {
  return (
    <article className={styles.launch}>
      {category && (
        <footer className={styles.launch_category}>{category}</footer>
      )}
      <h1 className={styles.launch_name}>{name}</h1>
      <time className={styles.launch_date}>
        {new Intl.DateTimeFormat("pt-br", {
          year: "numeric",
          month: ["month", "day", "hour"].includes(datePrecision)
            ? "2-digit"
            : undefined,
          day: ["day", "hour"].includes(datePrecision) ? "numeric" : undefined,
        }).format(new Date(date))}
      </time>
      {success === null && datePrecision === "hour" && (
        <LaunchCountdown date={date} />
      )}
      {success !== null && (
        <span className={styles.launch_date}>
          {success ? "Success" : "Failure"}
        </span>
      )}
    </article>
  );
}

export default Launch;
