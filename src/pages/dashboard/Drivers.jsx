import Axios from "@/lib/axios";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/locales/persian_fa";
import persian_cal from "react-date-object/calendars/persian";

import useSession from "@/hooks/use-session";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { DataTable } from "@/components/dashboard/drivers/data-table";
import { columns } from "@/components/dashboard/drivers/columns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

const Drivers = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { toast } = useToast();

  const { user } = useSession();

  const { data: drivers } = useQuery({
    queryKey: ["drivers"],
    queryFn: () => Axios.get("/drivers/list").then((res) => res.data?.list),
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      Axios.get("/reports/all", {
        params: {
          date_range_start: formatDate(startDate),
          date_range_end: formatDate(endDate),
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

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-5 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">راننده ها</h1>

        {user?.role !== "viewer" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>گزارش کل راننده ها</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>گزارش راننده ها</DialogTitle>
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
        )}
      </div>

      <DataTable columns={columns} data={drivers || []} />
    </motion.div>
  );
};

export default Drivers;
