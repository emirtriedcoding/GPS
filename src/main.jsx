import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import ThemeProvider from "./providers/theme-provider";
import QueryProvider from "./providers/query-provider";
import RefreshToken from "./providers/refresh-token-provider";

import App from "./pages/App.jsx";
import Auth from "./pages/Auth";

import ProtectDashboard from "./pages/dashboard/ProtectDashboard";
import Layout from "./pages/dashboard/Layout";

import RoutesPage from "./pages/dashboard/Routes";
import Drivers from "./pages/dashboard/Drivers";
import Panels from "./pages/dashboard/Panels";
import Gps from "./pages/dashboard/Gps";
import ActiveGps from "./pages/dashboard/ActiveGps";
import ExpireGPS from "./pages/dashboard/ExpireGPS";
import Users from "./pages/dashboard/Users";
import Sms from "./pages/dashboard/Sms";
import ChangePassword from "./pages/dashboard/ChangePassword";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <QueryProvider>
      <RefreshToken />
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<ProtectDashboard />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/routes" element={<RoutesPage />} />
              <Route path="/dashboard/panels" element={<Panels />} />
              <Route path="/dashboard/drivers" element={<Drivers />} />

              <Route path="/dashboard/gps" element={<Gps />} />
              <Route path="/dashboard/active-gps" element={<ActiveGps />} />
              <Route path="/dashboard/expire-close" element={<ExpireGPS />} />
              <Route path="/dashboard/settings/users" element={<Users />} />
              <Route path="/dashboard/settings/sms" element={<Sms />} />
              <Route
                path="/dashboard/settings/change-password"
                element={<ChangePassword />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryProvider>
  </ThemeProvider>
);
