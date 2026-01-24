"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backHref?: string;
  rightElement?: React.ReactNode;
}

export function Header({ title, showBack = false, backHref = "/", rightElement }: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-14 px-4 w-full">
      <div className="flex items-center gap-3">
        {showBack && (
          <Link href={backHref}>
            <ChevronLeft className="w-6 h-6 text-[var(--text-primary)]" />
          </Link>
        )}
        <span className="text-xl font-semibold text-[var(--text-primary)]">
          {title}
        </span>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
