"use client";

import Link from "next/link";
import { useState } from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

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
import { LoadingSpinner } from "../ui/loading";

import { register } from "@/services/auth";
import { IRegisterCredentials } from "@/types/user";
export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<IRegisterCredentials>({
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(credentials: IRegisterCredentials) {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await register(credentials);

      if (res) {
        toast.success(
          <p className="text-neutral-950">
            Your account has been created. Please sign in.
          </p>,
        );
        window.location.href = "/";
        return;
      } else {
        setErrorMessage("Invalid form submission");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("An unknown error occurred");
      setIsLoading(false);
      console.error("Form submission error", error);
      toast.error(
        <p className="text-neutral-950">
          An unknown error occurred. Please try again later.
        </p>,
      );
    }
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-y-scroll bg-constellation bg-repeat p-4 sm:justify-center">
      <div className="mx-auto w-full min-w-[300px] max-w-xl rounded-md bg-neutral-900 p-8">
        <h2 className="mb-8 text-3xl font-bold">Sign up</h2>

        {errorMessage && (
          <p className="mb-4 text-center text-red-600">{errorMessage}</p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-3xl space-y-3"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.getFieldState("userName").error && "border-red-600"
                      }
                      placeholder=""
                      autoComplete="username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  {!form.getFieldState("userName").error && (
                    <FormDescription>
                      This will be your public display name.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.getFieldState("fullName").error && "border-red-600"
                      }
                      placeholder=""
                      autoComplete="fullName"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will not be shown to the public
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.getFieldState("email").error && "border-red-600"
                      }
                      placeholder=""
                      autoComplete="email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Your email address</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="password"
                      {...field}
                      className={
                        form.getFieldState("password").error && "border-red-600"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="bg-neutral-100 text-neutral-950 hover:bg-neutral-300"
              >
                {isLoading ? <LoadingSpinner theme="dark" /> : "Create account"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <p className="text-center text-sm">
            {"Already have an account?"}{" "}
            <Link
              href="/sign-in"
              className="text-sm underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
