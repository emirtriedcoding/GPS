import MapComponent from "../Map";
import Delete from "@/components/modals/Delete";
import Axios from "@/lib/axios";
import EditRoute from "@/components/modals/EditRoute";

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "نام مسیر",
  },
  {
    accessorKey: "start_location",
    header: "مبدا",
  },
  {
    accessorKey: "end_location",
    header: "مقصد",
  },
  {
    accessorKey: "permitted_stop_time_min",
    header: "میزان توقف مجاز",
    cell: ({ row }) => `${row.original.permitted_stop_time_min} دقیقه`,
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditRoute route={row.original} />
          <MapComponent
            label="مشاهده نقاط"
            variant="outline"
            defaultPositions={row.original.points}
            readOnly
          />
          <Delete
            label="مسیر"
            onDelete={async () => {
              try {
                await Axios.delete("/routes/delete_base_route", {
                  params: {
                    id: row.original.id,
                  },
                });

                location.reload();
              } catch (e) {
                console.log("Error deleting the route", e);
              }
            }}
          />
        </div>
      );
    },
  },
];
