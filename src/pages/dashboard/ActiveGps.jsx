import Axios from "@/lib/axios";

import { columns } from "@/components/dashboard/active-gps/columns";
import { DataTable } from "@/components/dashboard/active-gps/data-table";

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";

const ActiveGps = () => {
  const [searchParams] = useSearchParams();

  const panelId = searchParams.get("panelId");

  const { data } = useQuery({
    queryKey: ["active-gps"],
    queryFn: () =>
      Axios.get("/gps_units/get_all", {
        params: {
          only_with_connected_driver: true,
          panel_id: panelId,
        },
      }).then((res) => res.data),
  });

  return (
    <motion.div
      initial={{
        y: 30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className="mt-5 space-y-6"
    >
      <h1 className="text-2xl font-bold">GPS های فعال</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default ActiveGps;
