"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AssetSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const AssetSearch = ({
  value,
  onChange,
  placeholder = "Search assets...",
  className,
}: AssetSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <div
      className={cn(
        "relative flex items-center",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-2.5 size-4 transition-colors",
          isFocused ? "text-[var(--ink-black)]" : "text-[var(--pencil-light)]"
        )}
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "pl-8 pr-8 py-2 h-9 text-sm font-handwriting",
          "bg-[var(--paper-white)] border-2 border-[var(--sketch-border)]",
          "rounded-sm placeholder:text-[var(--pencil-light)]",
          "focus:border-[var(--ink-black)] focus:ring-0 focus:ring-offset-0",
          "transition-colors"
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 p-0.5 rounded hover:bg-[var(--paper-cream)] transition-colors"
        >
          <X className="size-4 text-[var(--pencil-gray)]" />
        </button>
      )}
    </div>
  );
};
