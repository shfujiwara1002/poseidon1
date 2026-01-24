"use client";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-blue-light)]",
  secondary: "bg-transparent border-[1.5px] border-[var(--border)] text-[var(--text-secondary)] font-medium hover:bg-[var(--surface)]",
  danger: "bg-[var(--critical)] text-white font-semibold hover:bg-[var(--critical-light)]",
  success: "bg-transparent border-[1.5px] border-[var(--success)] text-[var(--success)] font-medium hover:bg-[var(--success-tint)]",
};

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center h-12 px-5 rounded-[var(--radius-md)] text-[15px] transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
