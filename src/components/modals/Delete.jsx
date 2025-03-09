import useSession from "@/hooks/use-session";

import { useState } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Delete = ({ label, onDelete }) => {
  const { user } = useSession();

  const [open, setOpen] = useState(false);

  if (user?.role === "viewer") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">حذف</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>حذف {label} </DialogTitle>
          <DialogDescription className="text-center">
            آیا از حذف {label} مطمئن هستید ؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button className="w-full" variant="ghost">
              لغو
            </Button>
          </DialogClose>
          <Button onClick={onDelete} className="w-full" variant="destructive">
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
