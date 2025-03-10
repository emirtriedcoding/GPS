import Axios from "@/lib/axios";

import Delete from "@/components/modals/Delete";

import EditSms from "@/components/modals/EditSms";

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "phone_number",
    header: "شماره تماس",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditSms sms={row.original} />
          <Delete
            label="اعلان SMS"
            onDelete={async () => {
              try {
                await Axios.delete("/sms_receivers/delete", {
                  params: {
                    id: row.original.id,
                  },
                });

                location.reload();
              } catch (error) {
                console.log("Error deleting the SMS", error);
              }
            }}
          />
        </div>
      );
    },
  },
];
