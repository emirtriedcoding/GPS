import Axios from "@/lib/axios";

import { columns } from "@/components/dashboard/expire-close/columns";
import { DataTable } from "@/components/dashboard/expire-close/data-table";

import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";

const ExpireGps = () => {
  const { data } = useQuery({
    queryKey: ["expire-close"],
    queryFn: () =>
      Axios.get("/gps_units/get_near_expire", {
        params: {
          days: 7,
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
      <h1 className="text-lg font-bold lg:text-2xl">GPS های انقضا نزدیک</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default ExpireGps;
