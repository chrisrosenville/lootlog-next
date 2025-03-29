"use client";
import React, { useActionState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import { Label } from "../ui/label";

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(submitLoginForm, null);

  const router = useRouter();

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col justify-center overflow-y-scroll bg-constellation bg-repeat p-4">
        <div className="mx-auto w-full min-w-[300px] max-w-xl rounded-md bg-neutral-900 p-8">
          <h2 className="mb-8 text-3xl font-bold">Sign in</h2>

          {state?.error && (
            <p className="text-center text-red-600">{state.error}</p>
          )}

          <form action={formAction} className="max-w-3xl space-y-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="example@lootlog.com"
                type="email"
                name="email"
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="********"
                type="password"
                name="password"
                className="w-full"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? <LoadingSpinner theme="dark" /> : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <p className="text-center text-sm">
              {"Don't have an account yet?"}{" "}
              <Link
                href="/sign-up"
                className="text-sm underline underline-offset-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
