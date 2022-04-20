import { useMemo } from "react";
import { useQuery } from "react-query";
import { Launch as LaunchType } from "schemas";
import Launch from "./Launch";

function PastLaunches() {
  const { data } = useQuery<LaunchType[]>("pastLaunches", () => {
    return fetch("http://localhost:3000/launches/past").then((res) =>
      res.json()
    );
  });

  // Nós adaptamos a query para remover os dados que não precisamos.
  const launches = useMemo(() => data?.reverse().slice(1), [data]);

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

export default PastLaunches;
