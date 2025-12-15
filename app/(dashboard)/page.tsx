"use client";

import React, { Suspense } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { LandingPage } from "@/components/landing/landing-page";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function DashboardContent() {
    const { organization } = useOrganization();

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
        if (!isLoaded) {
            return <LoadingSpinner />;
        }

        if (!isSignedIn) {
            return (
                <div className="fixed inset-0 z-50 bg-white">
                    <LandingPage />
                </div>
            );
        }

        return (
            <Suspense fallback={<LoadingSpinner />}>
                <DashboardContent />
            </Suspense>
        );
    } catch (error) {
        console.error("Dashboard error:", error);
        return (
            <ErrorState
                title="Error Loading Page"
                message="There was an error loading the dashboard. Please refresh the page or check the console for details."
            />
        );
    }
};

export default DashboardPage;