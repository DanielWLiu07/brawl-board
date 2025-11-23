"use client";

import dynamic from "next/dynamic";
import { ConvexClientProvider as ConvexClientProviderComponent } from "@/providers/convex-client-provider";

const ConvexClientProvider = dynamic(
  () => Promise.resolve(ConvexClientProviderComponent),
  { ssr: false }
);

export { ConvexClientProvider };