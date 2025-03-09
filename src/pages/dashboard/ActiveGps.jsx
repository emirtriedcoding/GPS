import { columns } from "@/components/dashboard/active-gps/columns";
import { DataTable } from "@/components/dashboard/active-gps/data-table";

import { motion } from "framer-motion";

const ActiveGps = () => {
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

      <DataTable columns={columns} data={[]} />
    </motion.div>
  );
};

export default ActiveGps;
