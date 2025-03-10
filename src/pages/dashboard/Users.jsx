import Axios from "@/lib/axios";

import useSession from "@/hooks/use-session";

import { motion } from "framer-motion";

import { columns } from "@/components/dashboard/users/columns";
import { DataTable } from "@/components/dashboard/users/data-table";

import { useQuery } from "@tanstack/react-query";

import { Navigate } from "react-router-dom";

const Users = () => {
  const { user } = useSession();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => Axios.get("/users/list").then((res) => res.data),
  });

  if (user && user.role !== "sudo" && user.role !== "super_admin") {
    return <Navigate to="/dashboard/routes" replace />;
  }

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
      <h1 className="text-lg font-bold lg:text-2xl">کاربران</h1>

      <DataTable columns={columns} data={data?.list || []} />
    </motion.div>
  );
};

export default Users;
