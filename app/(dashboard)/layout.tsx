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

    // For board routes, don't show dashboard sidebar/navbar (board has its own layout)
    if (isBoardRoute) {
        return <main className="h-full">{children}</main>;
    }

    return (
        <main className="h-full">
            <Sidebar />
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className = "h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardLayout