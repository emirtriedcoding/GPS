import Axios from "@/lib/axios";

import { useEffect, useState } from "react";

const useSession = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/auth/get_me");

        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, isAuthenticated, loading };
};

export default useSession;
