import Delete from "@/components/modals/Delete";
import useSession from "@/hooks/use-session";

import EditUser from "@/components/modals/EditUser";
import Axios from "@/lib/axios";

import { useToast } from "@/hooks/use-toast";

const DeleteUser = ({ username }) => {
  const { user } = useSession();

  if (!user || user.role === "viewer") return null;

  const { toast } = useToast();

  return (
    <Delete
      label="کاربر"
      onDelete={async () => {
        try {
          await Axios.delete("/users/delete", {
            params: {
              username,
            },
          });

          toast({
            title: "کاربر حذف شد.",
          });

          location.reload();
        } catch {
          toast({
            title: "خطای سرور.",
            variant: "destructive",
          });
        }
      }}
    />
  );
};

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "role",
    header: "نقش",
    cell: ({ row }) =>
      `${
        row.original.role === "sudo"
          ? "سودو"
          : row.original.role === "super_admin"
          ? "سوپر ادمین"
          : row.original.role === "admin"
          ? "ادمین"
          : "بیننده"
      } `,
  },
  {
    accessorKey: "username",
    header: "نام کاربری",
  },
  {
    accessorKey: "is_active",
    header: "وضعیت",
    cell: ({ row }) => (row.original?.is_active ? "فعال" : "غیر فعال"),
  },
  {
    accessorKey: "lastLogin",
    header: "آخرین ورود",
    cell: ({ row }) => {
      const d = new Date(row.original?.last_login).toLocaleDateString("fa-IR", {
        timeZone: "Asia/Tehran",
      });

      return d;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      if (row.original.role === "sudo") return null;

      return (
        <div className="flex items-center gap-2">
          <EditUser user={row.original} />
          <DeleteUser username={row.original?.username} />
        </div>
      );
    },
  },
];
