import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof KeyboardKeyVariants> {
    children: React.ReactElement;
    onClick: () => void;
    fixedWidth?: boolean;
    disabled?: boolean;
}

export const KeyboardKeyVariants = cva(
    "px-1.5 py-2 rounded-md flex items-center justify-center cursor-pointer font-semibold text-sm transition-all duration-200 border touch-manipulation active:scale-95",
    {
        variants: {
            variant: {
                neutral: "bg-[#F1F3F6]/75 border-gray-200 hover:bg-gray-200",
                success: "bg-success/75 border-success hover:opacity-90 text-white",
                warning: "bg-warning/75 border-warning hover:opacity-90 text-white",
                primary: "bg-primary/75 border-primary hover:opacity-90 text-white",
                error: "bg-error/75 border-error hover:opacity-90 text-white",
            }
        }
    }
)

export default function KeyboardKey({
    children, 
    onClick, 
    fixedWidth = true, 
    variant = "neutral",
    disabled = false
}: Props) {
    return (
        <button
            className={`
                ${KeyboardKeyVariants({ variant })} 
                ${fixedWidth ? 'lg:w-7 lg:h-10 min-w-[2.5rem] h-12' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}