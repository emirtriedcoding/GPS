import Axios from "@/lib/axios";

import { useEffect } from "react";

const RefreshToken = () => {
  const refreshToken = async () => {
    try {
      const res = await Axios.post("/auth/refresh");

      const newExpiresIn = Date.now() + res.data.expires_in * 1000;
      
      localStorage.setItem("expiresIn", newExpiresIn);

      scheduleRefresh(newExpiresIn);
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem("expiresIn");
    }
  };

  const scheduleRefresh = (expirationTime) => {
    const currentTime = Date.now();
    const timeUntilRefresh = expirationTime - currentTime - 60000;

    if (timeUntilRefresh > 0) {
      setTimeout(refreshToken, timeUntilRefresh);
    } else {
      refreshToken();
    }
  };

  useEffect(() => {
    const expiresIn = localStorage.getItem("expiresIn");

    if (expiresIn) {
      scheduleRefresh(parseInt(expiresIn, 10));
    }
  }, []);

  return null;
};

export default RefreshToken;
