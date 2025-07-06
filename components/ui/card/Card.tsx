import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export interface Props extends VariantProps<typeof cardVariants> {
    children: React.ReactNode;
    className?: string;
}

const cardVariants = cva(
  "border-2 overflow-hidden flex flex-col duration-300 transition-all rounded-lg",
  {
    variants: {
      variant: {
        default: "border-border bg-white",
        fade: "!border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50",
      },
    }
  }
)

export default function Card({ children, className, variant = "default" }: Props) {
    return (
        <div className={cn(cardVariants({ variant }), className)}>
            {children}
        </div>
    )
}