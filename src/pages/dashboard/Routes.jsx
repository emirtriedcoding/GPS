import Axios from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

import { columns } from "@/components/dashboard/routes/columns";
import { DataTable } from "@/components/dashboard/routes/data-table";

import { motion } from "framer-motion";

const Routes = () => {
  const { data } = useQuery({
    queryKey: ["routes"],
    queryFn: () =>
      Axios.get("/routes/list_base_routes").then((res) => res.data?.list),
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
      <h1 className="text-lg font-bold lg:text-2xl">لیست مسیر ها</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default Routes;
