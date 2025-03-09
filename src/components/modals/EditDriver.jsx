import Axios from "@/lib/axios";

import useSession from "@/hooks/use-session";

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

const EditDriver = ({ driver }) => {
  const { user } = useSession();

  const { toast } = useToast();

  const schema = z.object({
    fullName: z.string().min(1, { message: "نام ضروریست." }),
    email: z.string().email({ message: "ایمیل نامعتبر است." }),
    pelak: z.string().min(1, { message: "پلاک ضروریست." }),
    number: z.string().min(1, { message: "شماره تماس ضروریست." }),
    carType: z.enum(["car", "truck", "trailer", "other"]),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: driver.full_name || "",
      pelak: driver.plate_number || "",
      number: driver.phone_number || "",
      carType: driver.car_type || "",
      email: driver.email_address || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      Axios.patch(
        "/drivers/update",
        {
          full_name: data.fullName,
          plate_number: data.pelak,
          phone_number: data.number,
          car_type: data.carType,
          connected_gps: null,
          id: driver.id,
          email_address: data.email,
        },
        {
          params: {
            driver_id: driver.id,
          },
        }
      ),
    onSuccess: () => {
      toast({
        title: "عملیات با موفقیت انجام شد.",
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

  if (user?.role === "viewer") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ویرایش راننده</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>ویرایش راننده</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-3"
          >
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="مرادی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="carType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع خودرو</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="نوع خودرو را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="car">سواری</SelectItem>
                      <SelectItem value="truck">باری</SelectItem>
                      <SelectItem value="trailer">تریلی</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input placeholder="تایپ کنید" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس ایمیل</FormLabel>
                  <FormControl>
                    <Input placeholder="تایپ کنید" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="pelak"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره پلاک</FormLabel>
                  <FormControl>
                    <Input placeholder="تایپ کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="w-full">
              ویرایش
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDriver;
