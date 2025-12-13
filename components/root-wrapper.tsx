"use client";

import { usePathname } from "next/navigation";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ReactNode } from "react";

interface RootWrapperProps {
    children: ReactNode;
}

export const RootWrapper = ({ children }: RootWrapperProps) => {
    const pathname = usePathname();
    
    const isPublicRoute = pathname === "/" || 
                         pathname?.startsWith("/sign-in") || 
                         pathname?.startsWith("/sign-up") ||
                         pathname?.startsWith("/board/");
    
    if (isPublicRoute) {
        return <>{children}</>;
    }

    return <ConvexClientProvider>{children}</ConvexClientProvider>;
};
