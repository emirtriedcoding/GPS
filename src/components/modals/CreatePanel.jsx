import Axios from "@/lib/axios";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const CreatePanel = () => {
  const { toast } = useToast();

  const schema = z.object({
    url: z.string().min(1, { message: "آدرس پنل ضروریست." }),
    username: z.string().min(1, { message: "نام کاربری ضروریست." }),
    password: z.string().min(1, { message: "رمز عبور ضروریست." }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
      username: "",
      password: "",
    },
  });

  const { mutate , isPending } = useMutation({
    mutationFn: (data) =>
      Axios.post("/panels/add", null, {
        params: {
          panel_url: data.url,
          ...data,
        },
      }),
    onSuccess: () => {
      toast({
        title: "پنل با موفقیت ایجاد شد",
      });

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
        <Button>ایجاد پنل</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>ایجاد پنل</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 gap-3">
              <FormField
                name="url"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس پنل</FormLabel>
                    <FormControl>
                      <Input placeholder="تایپ کنید ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="تایپ کنید"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="w-full">ایجاد</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePanel;
