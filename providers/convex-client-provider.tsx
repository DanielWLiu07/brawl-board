"use client";

import { ClerkProvider, useAuth, SignInButton, SignIn, SignUp} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated} from "convex/react";
import { Loading } from "@/components/auth/loading";


    interface ConvexClientProviderProps {
        children: React.ReactNode;
    }
    
    const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

    const convex = new ConvexReactClient(convexURL);

    export const ConvexClientProvider = ({
         children 
        }: ConvexClientProviderProps) => {
            return (
                <ClerkProvider>
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
                </ClerkProvider>
            );
        };