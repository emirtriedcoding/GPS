import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const sidebarState = getCookie("sidebar_state");

  return (
    <SidebarProvider defaultOpen={sidebarState === "true"}>
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <main className="h-screen lg:p-3 mt-[95px] p-1">
          <Outlet />
        </main>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
