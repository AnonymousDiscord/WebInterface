import { useState, useEffect } from "react";
import { Stats } from "../structure/JsonTypes";
import { getStats } from "../utils/Request";

export function useStats(): Stats | undefined {
  const [stats, setStats] = useState<Stats>()
  useEffect(() => {
    getStats().then(setStats)
    return setStats as () => void
  }, [])
  return stats
}