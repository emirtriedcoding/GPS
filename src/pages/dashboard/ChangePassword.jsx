import Axios from "@/lib/axios";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

const ChangePassword = () => {
  const { toast } = useToast();

  const schema = z
    .object({
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          {
            message:
              "گذرواژه حداقل باید 8 کاراکتر بزرگ و کوچک ، شامل عدد ، حروف و مواردی مانند @ باشد.",
          }
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "گذرواژه ها یکسان نیستند.",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ password }) =>
      Axios.patch("/auth/change_password", null, {
        params: {
          new_password: password,
        },
      }),
    onSuccess: () => {
      toast({
        title: "گذرواژه با موفقیت تغییر یافت.",
      });

      form.reset();

      location.reload();
    },
    onError: () => {
      toast({
        title: "خطای سرور.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex justify-center pt-52">
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
          duration: 0.35,
        }}
      >
        <Card className="w-[355px] lg:w-[385px]">
          <CardHeader>
            <CardTitle>تغییر گذرواژه</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) =>
                  mutate({ password: data.password })
                )}
                className="space-y-3"
              >
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

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تکرار گذرواژه</FormLabel>
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
                  ثبت
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
