import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface Props extends VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
}

const buttonVariants = cva(
  "py-2 px-6 text-sm rounded-md font-bold transition",
  {
    variants: {
      variant: {
        fade:
          "text-foreground bg-gradient-to-r from-primary to-secondary text-white",
        skeleton:
          "bg-transparent border-border border-2 font-semibold",        
      },
    },
    defaultVariants: {
      variant: "fade",
    },
  }
)

export default function Button({ children, variant }: Props) {
    return (
        <button className={buttonVariants({ variant })}>
            {children}
        </button>
    )
}