import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface Props extends VariantProps<typeof buttonVariants> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const buttonVariants = cva(
  "py-2 px-6 text-sm rounded-md font-bold transition duration-200 hover:brightness-90 flex justify-center items-center gap-1",
  {
    variants: {
      variant: {
        primary: "text-white bg-primary",
        fade: "bg-gradient-to-r from-primary to-secondary text-white",
        skeleton: "bg-transparent border-border border-2 font-semibold hover:bg-opacity-5",
        accent: "text-accent/80 bg-background border-2 border-accent/20"
      },
    },
    defaultVariants: {
      variant: "fade",
    },
  }
)

export default function Button({ children, variant, onClick, className, type="button", disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick} 
      type={type}
      className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${cn(buttonVariants({ variant }), className)}`}  
    >
      {children}
    </button>
  )
}
