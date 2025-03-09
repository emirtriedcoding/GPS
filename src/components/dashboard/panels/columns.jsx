import Delete from "@/components/modals/Delete";
import EditPanel from "@/components/modals/EditPanel";

import Axios from "@/lib/axios";

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "شماره",
  },
  {
    accessorKey: "panel_url",
    header: "آدرس پنل",
    cell: ({ row }) => {
      return (
        <a
          href={row.original.panel_url}
          target="_blank"
          className="text-xs font-bold text-blue-500 underline"
        >
          کلیک کنید
        </a>
      );
    },
  },
  {
    accessorKey: "username",
    header: "نام کاربری",
  },

  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditPanel panel={row.original} />
          <Delete
            label="پنل"
            onDelete={async () => {
              try {
                await Axios.delete("/panels/delete", {
                  params: {
                    panel_id: row.original.id,
                  },
                });

                location.reload();
              } catch (e) {
                console.log("Error deleting panel.", e);
              }
            }}
          />
        </div>
      );
    },
  },
];
