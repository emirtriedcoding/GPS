import Axios from "@/lib/axios";

import { motion } from "framer-motion";

import { columns } from "@/components/dashboard/sms/columns";
import { DataTable } from "@/components/dashboard/sms/data-table";

import { useQuery } from "@tanstack/react-query";

const Sms = () => {
  const { data } = useQuery({
    queryKey: ["sms"],
    queryFn: () =>
      Axios.get("/sms_receivers/get_all").then((res) => res.data?.list),
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
      <h1 className="text-lg font-bold lg:text-2xl">SMS ها</h1>

      <DataTable columns={columns} data={data || []} />
    </motion.div>
  );
};

export default Sms;
