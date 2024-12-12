"use client";

import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/store";

export function Providers({ children }: PropsWithChildren) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
