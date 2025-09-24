import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Loadingscreen from "./Loadingscreen";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (2s splash screen)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loadingscreen />;
  }

  return <Dashboard />;
}
