import { useQuery } from "react-query";
import { Launch as LaunchType } from "schemas";
import Launch from "./Launch";

function LatestLaunch() {
  const { data, isLoading } = useQuery<LaunchType>("latestLaunch", () => {
    return fetch("http://localhost:3000/launches/latest").then((res) =>
      res.json()
    );
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Launch
      name={data.name}
      date={data.date}
      datePrecision={data.date_precision}
      category="Latest launch"
      success={data.success}
    />
  );
}

export default LatestLaunch;
