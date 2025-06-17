import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof variants> {
    title: string;
    description: string;
    Icon: React.ElementType;
}

const variants = cva(
    "w-14 h-14 rounded-full items-center justify-center text-center",
    {
        variants: {
            variant: {

            },
            color: {
                primary: "bg-primary/15 text-primary/80",
                secondary: "bg-secondary/15 text-secondary/80",
                accent: "bg-accent/15 text-accent/80",
            }
        }
    }
)

export default function UspBulletPoint({ Icon, title, description, color = "primary" }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center text-center">
            {/* Icon */}
            <div className={`flex justify-center ${variants({ color })}`}>
                <Icon size="28"></Icon>
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