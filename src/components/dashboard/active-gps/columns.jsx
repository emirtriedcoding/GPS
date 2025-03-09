import Delete from "@/components/modals/Delete";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const drivers = [
  { id: 1, name: "راننده تستی اول" },
  { id: 2, name: "راننده تستی دوم" },
  { id: 3, name: "راننده تستی سوم" },
  { id: 4, name: "راننده تستی چهارم" },
];

const EditDriver = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.includes(searchQuery)
  );

  if (location.pathname.includes("active")) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ویرایش راننده</Button>
      </DialogTrigger>
      <DialogContent>
        <Select dir="rtl" onValueChange={setSelectedDriver}>
          <SelectTrigger className="mt-5">
            <SelectValue placeholder="انتخاب راننده" />
          </SelectTrigger>
          <SelectContent>
            {/* Search Input */}
            <div className="p-2">
              <Input
                placeholder="جستجوی راننده..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Driver List */}
            <SelectGroup>
              {filteredDrivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.name}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogClose asChild>
          <Button className="w-full">ثبت</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: () => {
      return 1;
    },
  },
  {
    accessorKey: "numero",
    header: "شماره GPS",
  },
  {
    accessorKey: "driver",
    header: "نام راننده",
  },
  {
    accessorKey: "driver",
    header: "نام مسیر",
  },
];
