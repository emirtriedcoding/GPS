import useSession from "@/hooks/use-session";

import Loading from "@/components/Loading";

import { Navigate } from "react-router-dom";

function App() {
  const { loading, isAuthenticated } = useSession();

  if (loading) return <Loading />;

  if (!loading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard/routes" replace />;
  }

  return null;
}

export default App;
