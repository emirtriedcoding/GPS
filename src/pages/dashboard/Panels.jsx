import Axios from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

import { columns } from "@/components/dashboard/panels/columns";
import { DataTable } from "@/components/dashboard/panels/data-table";

import { motion } from "framer-motion";

const Panels = () => {
  const { data } = useQuery({
    queryKey: ["panels"],
    queryFn: () => Axios.get("/panels/list").then((res) => res.data),
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
      <h1 className="text-2xl font-bold">لیست پنل ها</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default Panels;
