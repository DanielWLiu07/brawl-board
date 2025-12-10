"use client";

import React, { Suspense } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { LandingPage } from "@/components/landing/landing-page";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function DashboardContent() {
    const { organization } = useOrganization();

    // Default query params for now - can be enhanced later
    const params = {
        search: undefined,
        favorites: undefined,
    };

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <div>
                    <BoardList
                        orgId={organization.id}
                        query={params}
                    />
                </div>
            )}
        </div>
    );
}

const DashboardPage = () => {
    const { isSignedIn, isLoaded } = useUser();

    try {
        // Show loading state
        if (!isLoaded) {
            return (
                <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-gray-600 handwriting-font">Loading...</p>
                    </div>
                </div>
            );
        }

        // Show landing page if not signed in (full page, no dashboard layout)
        if (!isSignedIn) {
            return (
                <div className="fixed inset-0 z-50 bg-white">
                    <LandingPage />
                </div>
            );
        }

        // Show dashboard if signed in
        return (
            <Suspense fallback={
                <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-gray-600 handwriting-font">Loading...</p>
                    </div>
                </div>
            }>
                <DashboardContent />
            </Suspense>
        );
    } catch (error) {
        console.error("Dashboard error:", error);
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="flex flex-col items-center gap-4 max-w-md p-8">
                    <h2 className="text-2xl font-bold text-red-600 handwriting-font">Error Loading Page</h2>
                    <p className="text-gray-700 handwriting-font text-center">
                        There was an error loading the dashboard. Please refresh the page or check the console for details.
                    </p>
                </div>
            </div>
        );
    }
};

export default DashboardPage;