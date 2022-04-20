import { useQuery } from "react-query";
import { Launch as LaunchType } from "schemas";
import Launch from "./Launch";

function NextLaunch() {
  const { data, isLoading } = useQuery<LaunchType>("nextLaunch", () => {
    return fetch("http://localhost:3000/launches/next").then((res) =>
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
      category="Upcoming launch"
      success={data.success}
    />
  );
}

export default NextLaunch;
