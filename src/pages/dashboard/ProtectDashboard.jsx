import useSession from "@/hooks/use-session";

import Loading from "@/components/Loading";

import { Navigate, Outlet } from "react-router-dom";

const ProtectDashboard = () => {
  const { loading, isAuthenticated } = useSession();

  if (loading) return <Loading />;

  if (!loading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectDashboard;
