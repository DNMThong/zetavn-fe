"use client";

import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/pageloader";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Provider store={store}>
      {isLoading && <PageLoader />}
      {!isLoading && children}
    </Provider>
  );
}
