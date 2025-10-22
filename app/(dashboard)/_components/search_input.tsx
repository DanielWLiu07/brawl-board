"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";

import {
    ChangeEvent,
    useEffect,
    useState
} from "react";

export const SearchInput = () => {
    return (
        <div className="flex items-center">
            Search Input
        </div>
    );
};