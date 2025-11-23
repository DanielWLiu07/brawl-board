"use client";

import { usePathname } from "next/navigation";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ReactNode } from "react";

interface RootWrapperProps {
    children: ReactNode;
}

export const RootWrapper = ({ children }: RootWrapperProps) => {
    const pathname = usePathname();
    
    // If it's a public route, show children directly (no Convex auth needed)
    const isPublicRoute = pathname === "/" || 
                         pathname?.startsWith("/sign-in") || 
                         pathname?.startsWith("/sign-up") ||
                         pathname?.startsWith("/board/"); // Allow board routes without auth for temporary boards
    
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // For all other routes (dashboard), use ConvexClientProvider for auth protection
    return <ConvexClientProvider>{children}</ConvexClientProvider>;
};
