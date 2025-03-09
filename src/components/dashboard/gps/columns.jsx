import Axios from "@/lib/axios";

import useSession from "@/hooks/use-session";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditDriver = ({ gpsId }) => {
  const { user, loading } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  const { toast } = useToast();

  const { data: drivers } = useQuery({
    queryKey: ["drivers"],
    queryFn: () => Axios.get("/drivers/list").then((res) => res.data?.list),
  });

  const filteredDrivers = drivers?.filter((driver) =>
    driver?.full_name?.includes(searchQuery)
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      Axios.post("/gps_units/set_to_driver", null, {
        params: {
          gps_id: Number(gpsId),
          driver_id: Number(selectedDriver),
        },
      }),
    onSuccess: () => {
      toast({
        title: "راننده با موفقیت تغییر کرد.",
      });

      location.reload();
    },
    onError: () => {
      toast({
        title: "خطای سرور.",
        variant: "destructive",
      });
    },
  });

  if (loading) return null;

  if (user?.role === "viewer") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ویرایش راننده</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش راننده</DialogTitle>
        </DialogHeader>
        <Select dir="rtl" onValueChange={setSelectedDriver}>
          <SelectTrigger className="mt-5">
            <SelectValue placeholder="انتخاب راننده" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="جستجوی راننده..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <SelectGroup>
              {filteredDrivers?.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.full_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={isPending} onClick={mutate} className="w-full">
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
    accessorKey: "gps_number",
    header: "شماره GPS",
  },
  {
    accessorKey: "battery_percent",
    header: "باطری",
    cell: ({ row }) => <span>%{row.original.battery_percent}</span>,
  },
  {
    accessorKey: "position",
    header: "موقعیت",
    cell: ({ row }) => {
      return (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${row.original.latitude},${row.original.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          مشاهده
        </a>
      );
    },
  },
  {
    accessorKey: "driver",
    header: "راننده فعلی",
    cell: ({ row }) => row?.original?.driver?.driver_name || "نامشخص",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <EditDriver gpsId={row.original.id} />,
  },
];
