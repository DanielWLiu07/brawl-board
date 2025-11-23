"use client";

import React, { useMemo } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface LandingProviderProps {
    children: ReactNode;
}

export const LandingProvider = ({
    children
}: LandingProviderProps) => {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            {children}
        </ClerkProvider>
    );
};
