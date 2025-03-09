import Delete from "@/components/modals/Delete";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/locales/persian_fa";
import persian_cal from "react-date-object/calendars/persian";

import Axios from "@/lib/axios";

import EditDriver from "@/components/modals/EditDriver";

import useSession from "@/hooks/use-session";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReportDriver = ({ driverId }) => {
  const { toast } = useToast();

  const { user } = useSession();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      Axios.get("/reports/driver", {
        params: {
          date_range_start: formatDate(startDate),
          date_range_end: formatDate(endDate),
          driver_id: driverId,
        },
      }),
    onSuccess: () => {
      toast({
        title: "عملیات با موفقیت انجام شد.",
      });
    },
    onError: () => {
      toast({
        title: "خطای سرور.",
        variant: "destructive",
      });
    },
  });

  if (user?.role === "viewer") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>گزارش راننده</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>گزارش راننده</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2.5 text-xs font-medium">
            <span>از : </span>
            <DatePicker
              locale={persian}
              calendar={persian_cal}
              value={startDate}
              onChange={(d) => setStartDate(new Date(d))}
            />
          </div>

          <div className="space-y-2.5 text-xs font-medium">
            <span>تا : </span>
            <DatePicker
              locale={persian}
              calendar={persian_cal}
              value={endDate}
              onChange={(d) => setEndDate(new Date(d))}
            />
          </div>
        </div>
        <Button onClick={mutate} disabled={isPending}>
          ثبت
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "full_name",
    header: "نام راننده",
  },
  {
    accessorKey: "phone_number",
    header: "شماره تماس",
  },
  {
    accessorKey: "plate_number",
    header: "پلاک",
  },
  {
    accessorKey: "type",
    header: "نوع خودرو",
    cell: ({ row }) => {
      return row.original.car_type === "car"
        ? "سواری"
        : row.original.car_type === "truck"
        ? "کامیون"
        : row.original.car_type === "trailer"
        ? "تریلی"
        : "سایر";
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditDriver driver={row.original} />
          <Delete
            label="راننده"
            onDelete={async () => {
              try {
                await Axios.delete("/drivers/delete", {
                  params: {
                    id: row.original.id,
                  },
                });

                location.reload();
              } catch (e) {
                console.log("Error while deleting driver.", e);
              }
            }}
          />
          <ReportDriver driverId={row.original.id} />
        </div>
      );
    },
  },
];
