"use client";

import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({  
    children, 
}: DashboardLayoutProps) => {
    const pathname = usePathname();
    const isBoardRoute = pathname?.startsWith("/board/");

    if (isBoardRoute) {
        return <main className="h-full">{children}</main>;
    }

    return (
        <main className="h-full bg-gradient-to-br from-blue-50 via-white to-blue-50 paper-texture">
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                <div className="notebook-lines"></div>
            </div>
            <Sidebar />
            <div className="pl-[60px] h-full relative z-10">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardLayout