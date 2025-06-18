import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { Clock, User } from "lucide-react";
import Link from "next/link";

interface Props {
    name: string;    
    color: string;
    bgColor: string;
    description: string;
    players: string;
    time: string;
    Icon: React.ElementType;
    href: string;
    cardClassName?: string;
}

export function GameModeCard({ name, color, bgColor, description, players, time, Icon, cardClassName, href }: Props) {
    return (
        <Link href={href}>
            <Card className={cardClassName}>
                <CardBody>
                    <div className="flex flex-row items-center gap-2 lg:gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColor}`}>
                            <Icon className={color} />
                        </div>
                        <div className="font-semibold text-xl tracking-tight">{name}</div>
                    </div>

                    <p className="text-foreground-muted">{description}</p>

                    <div className="flex flex-row gap-2 text-sm font-medium">
                        <TextWithIcon Icon={User}>{players}</TextWithIcon>
                        <TextWithIcon Icon={Clock}>{time}</TextWithIcon>
                    </div>
                </CardBody>
            </Card>            
        </Link>
    )
}