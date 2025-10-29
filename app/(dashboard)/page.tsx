"use client";

import React from "react";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { useSearchParams } from "next/navigation";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
    const { organization } = useOrganization();

    const searchParams = useSearchParams();
    const params = {
        search: searchParams.get("search") || undefined,
        favorites: searchParams.get("favorites") || undefined,
    };

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {JSON.stringify(params)}
            {!organization ? (
                <EmptyOrg />
            ) : (
                <div>
                    <BoardList
                        orgId = {organization.id}
                        query = {searchParams}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage