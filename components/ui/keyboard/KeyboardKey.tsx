import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof KeyboardKeyVariants> {
    children: React.ReactElement;
    onClick: () => void;
    fixedWidth?: boolean;
}

export const KeyboardKeyVariants = cva(
    "px-1.5 py-2 rounded-md flex items-center justify-center cursor-pointer font-semibold",
    {
        variants: {
            variant: {
                neutral: "bg-[#F1F3F6]",
                success: "bg-success",
                warning: "bg-warning",
                primary: "bg-primary",
                error: "bg-error",
            }
        }
    }
)

export default function KeyboardKey({children, onClick, fixedWidth = true, variant = "neutral" }: Props) {
    return (
        <button
            className={`${KeyboardKeyVariants({ variant })} ${fixedWidth ? 'lg:w-7 lg:h-10' : ''}`}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    )
}