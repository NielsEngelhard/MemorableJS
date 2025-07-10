import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const badgeVariants = cva(
  "flex items-center px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer font-semibold gap-1",
  {
    variants: {
      variant: {
        primary: "",
        accent: "bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-700",

      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export default function Badge({ children, onClick, className, variant }: Props) {
    return (
        <div 
        className={cn(badgeVariants({ variant }), className)}
        onClick={onClick}
        >
        {children}
        </div>        
    )
}