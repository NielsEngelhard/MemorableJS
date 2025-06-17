import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof variants> {
    icon: string;
    title: string;
    description: string;
}

const variants = cva(
    "w-14 h-14 rounded-full items-center justify-center text-center",
    {
        variants: {
            variant: {

            },
            color: {
                primary: "bg-primary/25",
                secondary: "bg-secondary/25",
                accent: "bg-accent/25",
            }
        }
    }
)

export default function UspBulletPoint({ icon, title, description, color = "primary" }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center text-center">
            {/* Icon */}
            <div className={variants({ color })}>
                <div>lol</div>
            </div>

            <div>
                {/* Title */}
                <div className="font-semibold text-">
                    {title}
                </div>

                {/* Description */}
                <p className="text-foreground-muted text-sm">
                    {description}
                </p>                
            </div>
        </div>
    )
}