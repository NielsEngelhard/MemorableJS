import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface Props extends VariantProps<typeof buttonVariants> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const buttonVariants = cva(
  "py-2 px-6 text-sm rounded-md font-bold transition duration-200 cursor-pointer hover:brightness-90",
  {
    variants: {
      variant: {
        fade: "text-foreground bg-gradient-to-r from-primary to-secondary text-white",
        skeleton: "bg-transparent border-border border-2 font-semibold hover:bg-opacity-5",
      },
    },
    defaultVariants: {
      variant: "fade",
    },
  }
)

export default function Button({ children, variant, onClick, className }: Props) {
  return (
    <button onClick={onClick} className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  )
}
