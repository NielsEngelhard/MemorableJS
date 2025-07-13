import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const badgeVariants = cva(
  "flex items-center rounded-full transition-all duration-300 cursor-pointer font-semibold gap-1 w-fit",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        accent: "bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-700",

      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "word-spacing-wide px-4"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    },
  }
)

export default function Badge({ children, onClick, className, variant, size }: Props) {
    return (
        <div 
        className={cn(badgeVariants({ variant, size }), className)}
        onClick={onClick}
        >
        {children}
        </div>        
    )
}