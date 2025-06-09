"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/logic/store"

// Tanstack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Providers({ children }) {
  const storeRef = useRef(makeStore());

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>{children}</Provider>
    </QueryClientProvider>
  );
}

