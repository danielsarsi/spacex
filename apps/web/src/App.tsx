import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LatestLaunch from "./components/LatestLaunch";
import NextLaunch from "./components/NextLaunch";
import PastLaunches from "./components/PastLaunches";
import UpcomingLaunches from "./components/UpcomingLaunches";
import styles from "./styles/Launches.module.css";

const queryClient = new QueryClient();

function App() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [ref.current]);

  return (
    <QueryClientProvider client={queryClient}>
      <section className={styles.launches}>
        <UpcomingLaunches />
      </section>
      <section className={styles.launches} ref={ref}>
        <NextLaunch />
        <LatestLaunch />
      </section>
      <section className={styles.launches}>
        <PastLaunches />
      </section>
    </QueryClientProvider>
  );
}

export default App;
