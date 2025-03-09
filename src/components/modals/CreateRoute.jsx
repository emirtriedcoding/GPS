import Axios from "@/lib/axios";

import MapComponent from "@/components/dashboard/Map";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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

const CreateRoute = () => {
  const { toast } = useToast();

  const [points, setPoints] = useState([]);

  const schema = z.object({
    name: z.string().min(1, { message: "نام مسیر ضروریست." }),
    origin: z.string().min(1, { message: "مبدا ضروریست." }),
    destination: z.string().min(1, { message: "مقصد ضروریست." }),
    stopLimit: z.string().min(1, { message: "میزان توقف مجاز ضروریست." }),
    deviationLimit: z.string().min(1, { message: "میزان انحراف ضروریست." }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      origin: "",
      destination: "",
      stopLimit: "",
      deviationLimit: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      Axios.post("/routes/add_base_route", {
        name: data.name,
        start_location: data.origin,
        end_location: data.destination,
        permitted_stop_time_min: data.stopLimit,
        points,
      }),
    onSuccess: () => {
      toast({
        title: "مسیر با موفقیت ایجاد شد.",
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
        <Button>ایجاد مسیر</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>ایجاد مسیر</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-3"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام مسیر</FormLabel>
                  <FormControl>
                    <Input placeholder="مسیر اول" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="origin"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مبدا</FormLabel>
                    <FormControl>
                      <Input placeholder="یاسوج" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="destination"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مقصد</FormLabel>
                    <FormControl>
                      <Input placeholder="تهران" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="stopLimit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>میزان توقف مجاز</FormLabel>
                    <FormControl>
                      <Input placeholder="تایپ کنید" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="deviationLimit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>میزان انحراف مجاز</FormLabel>
                    <FormControl>
                      <Input placeholder="تایپ کنید" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <MapComponent
              label="انتخاب نقاط"
              onPosition={(positions) => setPoints(positions)}
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

export default CreateRoute;
