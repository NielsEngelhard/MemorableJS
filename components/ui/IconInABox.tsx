import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof iconInABoxVariants> {
    Icon: React.ElementType;
}

const iconInABoxVariants = cva(
  "",
  {
    variants: {
      color: {
        primary: "bg-primary/20 text-primary/80",
        secondary: "text-secondary/80 bg-secondary/20",
      },
      size: {
        sm: "w-8 h-8 rounded-md",
        md: "w-10 h-10 rounded-lg",
        lg: "w-12 h-12 rounded-lg"
      },
    },
    defaultVariants: {
        size: "md",
        color: "primary"
    }
  }
)

export default function IconInABox({ Icon, size, color }: Props) {
    return (
        <div className={`flex items-center justify-center ${cn(iconInABoxVariants({ size, color }))}`}>
            <Icon size={24} />
        </div>
    )
}