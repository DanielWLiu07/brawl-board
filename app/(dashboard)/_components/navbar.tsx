"use client";

import { UserButton, OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    const organization = useOrganization();

    return (
        <div className="flex items-center gap-x-4 p-5 bg-white/80 backdrop-blur-sm border-b-2 border-gray-200 paper-shadow">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal={false}
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "376px"
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid #E5E7EB",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                            }
                        }
                    }}
                />
            </div>
            {organization && <InviteButton />}
            <UserButton />
        </div>
    );
};