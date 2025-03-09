import ModeToggle from "../ModeToggle";
import useSession from "@/hooks/use-session";

import { SidebarTrigger, useSidebar } from "../ui/sidebar";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const { open } = useSidebar();

  const { user } = useSession();

  return (
    <nav
      className={cn(
        "flex items-center justify-between h-[75px] fixed left-0 px-3 rounded-bl-3xl z-50 rounded-br-3xl lg:rounded-br-none bg-sidebar text-sidebar-foreground shadow-lg",
        open ? "lg:right-[16rem] right-0" : "right-0"
      )}
    >
      <div className="flex items-center gap-3">
        <ModeToggle />
        <SidebarTrigger className="-mr-4" />
        <span className="text-xs font-bold lg:text-sm ">
          خوش اومدی {user?.username} عزیز
        </span>
      </div>

      <span className="text-xs font-bold">
        {new Date().toLocaleDateString("fa-IR")}
      </span>
    </nav>
  );
};

export default Navbar;
