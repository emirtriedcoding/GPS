import Axios from "@/lib/axios";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateSms = () => {
  const { toast } = useToast();

  const schema = z.object({
    number: z.string().regex(/^((0?9)|(\+?989))\d{9}$/, {
      message: "شماره تلفن معتبر نمیباشد.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      number: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      Axios.post("/sms_receivers/add", null, {
        params: {
          phone_number: data.number,
        },
      }),
    onSuccess: () => {
      toast({
        title: "عملیات با موفقیت انجام شد.",
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>افزودن شماره جدید</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>افزودن شماره جدید</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-3"
          >
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تلفن</FormLabel>
                  <FormControl>
                    <Input placeholder="09128234332" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="w-full">
              ایجاد
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSms;
