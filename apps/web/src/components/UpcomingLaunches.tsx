import { useMemo } from "react";
import { useQuery } from "react-query";
import { Launch as LaunchType } from "schemas";
import Launch from "./Launch";

function UpcomingLaunches() {
  const { data } = useQuery<LaunchType[]>("upcomingLaunches", () => {
    return fetch("http://localhost:3000/launches/upcoming").then((res) =>
      res.json()
    );
  });

  // Nós adaptamos a query para remover os dados que não precisamos.
  const launches = useMemo(() => data?.slice(0, data.length - 1), [data]);

  if (!launches) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {launches.map((launch) => (
        <Launch
          key={launch.id}
          name={launch.name}
          date={launch.date}
          datePrecision={launch.date_precision}
          success={launch.success}
        />
      ))}
    </>
  );
}

export default UpcomingLaunches;
