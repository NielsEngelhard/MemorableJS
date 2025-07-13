import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const badgeVariants = cva(
  "flex items-center rounded-full transition-all duration-300 cursor-pointer font-semibold gap-1 w-fit h-fit",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        accent: "bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-700",

      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-2 lg:px-4 py-0 lg:py-2"
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