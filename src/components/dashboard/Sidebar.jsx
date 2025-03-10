import Axios from "@/lib/axios";

import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { Button } from "../ui/button";

import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

import {
  CarFront,
  ChevronDown,
  Route,
  Users,
  Key,
  PanelBottom,
  LogOut,
  Locate,
  LocateFixed,
  LocateOff,
  Settings2,
  MessageSquareText,
} from "lucide-react";

const routes = [
  { title: "مسیر ها", url: "/dashboard/routes", icon: Route },
  { title: "لیست پنل ها", url: "/dashboard/panels", icon: PanelBottom },

  { title: "راننده ها", url: "/dashboard/drivers", icon: CarFront },
];

const gpsRoutes = [
  { title: "همه GPS ها", url: "/dashboard/gps", icon: Locate },
  {
    title: "GPS های فعال",
    url: "/dashboard/active-gps",
    icon: LocateFixed,
  },
  {
    title: "انقضا نزدیک",
    url: "/dashboard/expire-close",
    icon: LocateOff,
  },
];

const settingsRoutes = [
  { title: "مدیریت کاربران", url: "/dashboard/settings/users", icon: Users },
  {
    title: "اعلان SMS",
    url: "/dashboard/settings/sms",
    icon: MessageSquareText,
  },
  {
    title: "تغییر گذرواژه",
    url: "/dashboard/settings/change-password",
    icon: Key,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout");

      return navigate("/auth", {
        replace: true,
      });
    } catch {
      toast({
        title: "خطایی رخ داده است.",
      });
    }
  };

  return (
    <ShadSidebar side="right">
      <SidebarHeader>
        <h1 className="p-3 text-lg font-bold text-center">پروژه مانیتورینگ</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "font-medium mt-2 transition rounded-none rounded-r-xl",
                      location.pathname === item.url
                        ? "bg-background text-primary"
                        : ""
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible className="group/collapsible ">
                <SidebarGroup className="!p-0">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="!text-white">
                      <div className="flex items-center gap-2 ">
                        <Locate size={19} />
                        مدیریت GPS
                      </div>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      {gpsRoutes.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "font-medium mt-2 transition rounded-none rounded-r-xl",
                              location.pathname === item.url
                                ? "bg-background text-primary"
                                : ""
                            )}
                          >
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>

              <Collapsible className="group/collapsible">
                <SidebarGroup className="!p-0">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="!text-white">
                      <div className="flex items-center gap-2 ">
                        <Settings2 size={19} />
                        تنظیمات
                      </div>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      {settingsRoutes.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "font-medium mt-2 transition rounded-none rounded-r-xl",
                              location.pathname === item.url
                                ? "bg-background text-primary"
                                : ""
                            )}
                          >
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} className="w-full" variant="destructive">
          خروج <LogOut />
        </Button>
      </SidebarFooter>
    </ShadSidebar>
  );
};

export default Sidebar;
