import Axios from "@/lib/axios";

import useSession from "@/hooks/use-session";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EditUser = ({ user }) => {
  const { user: currentUser } = useSession();

  const { toast } = useToast();

  const schema = z.object({
    role: z.enum(["sudo", "super_admin", "admin", "viewer"], {
      message: "نوع کاربری ضروریست.",
    }),
    username: z.string().min(5, { message: "نام کاربری حداقل 5 کاراکتر." }),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "گذرواژه حداقل باید 8 کاراکتر شامل عدد ، حروف و مواردی مانند @ باشد.",
        }
      ),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: user?.role || "viewer",
      username: user?.username || "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      Axios.patch("/users/update", null, {
        params: {
          new_username: data.username,
          new_password: data.password,
          new_role: data.role,
          username: user.username,
        },
      }),
    onSuccess: () => {
      toast({
        title: "کاربر ویرایش شد.",
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
        <Button>ویرایش</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>ویرایش کاربر</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-3"
          >
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نقش کاربر</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="نقش کاربر را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentUser?.role === "sudo" && (
                        <>
                          <SelectItem value="super_admin">
                            سوپر ادمین
                          </SelectItem>
                          <SelectItem value="admin">ادمین</SelectItem>
                          <SelectItem value="viewer">بیننده</SelectItem>
                        </>
                      )}
                      {currentUser?.role === "super_admin" && (
                        <>
                          <SelectItem value="admin">ادمین</SelectItem>
                          <SelectItem value="viewer">بیننده</SelectItem>
                        </>
                      )}
                      {currentUser?.role === "admin" && (
                        <SelectItem value="viewer">بیننده</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام کاربری</FormLabel>
                    <FormControl>
                      <Input placeholder="ali" {...field} />
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
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="w-full">
              ویرایش
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
