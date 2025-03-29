"use client";
import { useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { ModalRoot } from "@/components/modal/ModalRoot";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ModalRoot />
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
};
