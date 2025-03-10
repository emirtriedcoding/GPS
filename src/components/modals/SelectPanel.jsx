import Axios from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["selecting-pannels"],
    queryFn: () => Axios.get("/panels/list").then((res) => res.data),
  });

  const handlePanelChange = (value) => {
    setSearchParams({ panelId: value });

    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>انتخاب پنل</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>انتخاب پنل</DialogTitle>
        </DialogHeader>
        <Select
          dir="rtl"
          onValueChange={handlePanelChange}
          value={Number(searchParams.get("panelId")) || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب پنل" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((panel) => (
              <SelectItem key={panel.id} value={Number(panel.id)}>
                {panel.username} - ( {panel.panel_url} )
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
};

export default SelectPanel;
