import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof KeyboardKeyVariants> {
    letter: string;
    onClick: (key: string) => void;
}

export const KeyboardKeyVariants = cva(
    "px-1.5 py-2 rounded-md lg:w-7 lg:h-10 flex items-center justify-center cursor-pointer font-semibold",
    {
        variants: {
            variant: {
                neutral: "bg-[#F1F3F6]",
                success: "bg-success",
                warning: "bg-warning",
                error: "bg-error",
            }
        }
    }
)

export default function KeyboardKey({letter, onClick, variant = "neutral" }: Props) {
    return (
        <button className={KeyboardKeyVariants({ variant })} type="button" onClick={() => onClick(letter)}>
            {letter}
        </button>
    )
}