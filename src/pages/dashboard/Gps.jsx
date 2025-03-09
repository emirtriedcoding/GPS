import Axios from "@/lib/axios";

import { columns } from "@/components/dashboard/gps/columns";
import { DataTable } from "@/components/dashboard/gps/data-table";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";

const Gps = () => {
  const [searchParams] = useSearchParams();

  const panelId = searchParams.get("panelId");

  const { data } = useQuery({
    queryKey: ["gps"],
    queryFn: () =>
      Axios.get("/gps_units/get_all", {
        params: {
          panel_id: panelId,
        },
      }).then((res) => res.data),
    enabled: !!panelId,
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
      <h1 className="text-2xl font-bold">GPS ها</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default Gps;
