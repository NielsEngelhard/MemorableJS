import Card from "./Card";
import CardBody from "./CardBody";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof statisticCardVariants> {
    title: string | number;
    text: string;
}

const statisticCardVariants = cva(
  "",
  {
    variants: {
      titleColor: {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-success",
      }
    },
    defaultVariants: {
      titleColor: "primary"
    },
  }
)

export default function StatisticCard({ title, text, titleColor }: Props) {
    return (
        <Card>
            <CardBody className="flex items-center leading-none -space-y-1.5">
                <div className={`font-bold text-2xl ${cn(statisticCardVariants({ titleColor }))}`}>{title}</div>
                <div className="text-foreground-muted text-md">{text}</div>
            </CardBody>
        </Card>        
    )
}