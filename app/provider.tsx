"use client";
import { useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ModalRoot } from "@/components/modal/ModalRoot";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ModalRoot />
      {children}
    </QueryClientProvider>
  );
};
