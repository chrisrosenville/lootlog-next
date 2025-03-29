"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "@/lib/db/users";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Label } from "../ui/label";

const formSchema = z.object({
  userName: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(100),
  email: z.string(),
});

export const UserProfileForm = () => {
  const { user } = useUser();

  const [formInitialized, setFormInitialized] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // useEffect(() => {
  //   if (user && !formInitialized) {
  //     form.reset({
  //       userName: user.userName || "",
  //       firstName: user.firstName || "",
  //       lastName: user.lastName || "",
  //       email: user.email || "",
  //     });
  //     setFormInitialized(true);
  //   }
  // }, [user, form, formInitialized]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  // if (isLoading) return <LoadingScreen />;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-3xl space-y-3"
    >
      <div>
        <Label>Username</Label>
        <Input
          className="capitalize"
          placeholder={user?.username}
          autoComplete="username"
          type="text"
        />
      </div>

      <div>
        <Label>First name</Label>
        <Input
          className="capitalize"
          placeholder={user?.firstName}
          autoComplete="first name"
          type="text"
        />
      </div>

      <div>
        <Label>Last name</Label>
        <Input
          className="capitalize"
          placeholder={user?.lastName}
          autoComplete="last name"
          type="text"
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          placeholder={user?.emailAddresses[0].emailAddress}
          autoComplete="email"
          type="email"
        />
      </div>

      <Button
        type="submit"
        className="bg-neutral-100 text-neutral-950 hover:bg-neutral-300"
      >
        Update information
      </Button>
    </form>
  );
};
