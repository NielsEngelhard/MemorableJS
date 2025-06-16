import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface Props extends VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
}

const buttonVariants = cva(
  "",
  {
    variants: {
      variant: {
        fade:
          "text-foreground",
        reversed:
          "bg-primary/10 text-primary border-primary/20",        
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