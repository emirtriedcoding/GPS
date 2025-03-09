import Axios from "@/lib/axios";

import useSession from "@/hooks/use-session";

import Loading from "@/components/Loading";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Navigate, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSession();

  const { toast } = useToast();

  const schema = z.object({
    username: z.string().min(1, { message: "نام کاربری ضروریست." }),
    password: z.string().min(1, { message: "گذرواژه ضروریست." }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      const formData = new URLSearchParams();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      return Axios.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    },
    onSuccess: (res) => {
      const { expires_in } = res.data;

      const expirationTime = Date.now() + expires_in * 1000;
      localStorage.setItem("expiresIn", expirationTime);

      toast({
        title: "عملیات با موفقیت انجام شد.",
        description: "در حال انتقال ...",
      });

      return navigate("/dashboard/routes", {
        replace: true,
      });
    },
    onError: () => {
      return toast({
        title: "خطای سرور.",
        variant: "destructive",
      });
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard/routes" replace />;
  }

  return (
    <div className="flex">
      <div className="bg-[url('/assets/auth.jpg')] bg-no-repeat bg-cover bg-center w-[50%] blur-[1px] hidden lg:block" />

      <div className="min-h-screen flex items-center justify-center flex-1 p-2.5">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            bounce: 0.5,
            type: "spring",
          }}
        >
          <Card className="w-[390px]">
            <CardHeader>
              <CardTitle>ورود به پنل </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => mutate(data))}
                  className="p-3 space-y-3"
                >
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام کاربری</FormLabel>
                        <FormControl>
                          <Input placeholder="تایپ کنید" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>گذرواژه</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isPending} className="w-full">
                    ورود
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
