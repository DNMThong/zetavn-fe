"use client";

import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/pageloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
