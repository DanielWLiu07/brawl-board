"use client";

import React, { useMemo } from "react";
import { useAuth, SignIn } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

export const ConvexClientProvider = ({
    children
}: ConvexClientProviderProps) => {
    const convex = useMemo(() => {
        const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL;
        if (!convexURL) {
            throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
        }
        return new ConvexReactClient(convexURL);
    }, []);

    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated>
                {children}
            </Authenticated>

            <AuthLoading>
                <Loading />
            </AuthLoading>
            <Unauthenticated>
                <SignIn routing="hash" />
            </Unauthenticated>
        </ConvexProviderWithClerk>
    );
};