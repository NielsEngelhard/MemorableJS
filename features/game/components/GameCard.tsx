import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import CardHeader from "@/components/ui/card/CardHeader";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { Clock, Users } from "lucide-react";

interface Props {
    name: string;
    Icon: React.ElementType;
    description: string;
    amountOfPlayers: string;
    time: string;
    fromColor: string;
    toColor: string;    
}

export default function GameCard({ name, Icon , description, amountOfPlayers, time, fromColor, toColor }: Props) {
    return (
        <Card>
            <CardHeader fromColor={fromColor} toColor={toColor}>
                <div className="flex items-end h-full p-3">
                    <div className="flex items-center gap-1 text-white font-bold text-xl">
                        <Icon />{name} 
                    </div>
                </div>
            </CardHeader>

            <CardBody className="justify-between">
                <p className="text-md text-foreground">{description}</p>                              
                
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-foreground-muted flex flex-row gap-2 lg:gap-3">
                        <TextWithIcon Icon={Users}>{amountOfPlayers} players</TextWithIcon>
                        <TextWithIcon Icon={Clock}>{time} min</TextWithIcon>
                    </div>            

                    <Button className={`bg-gradient-to-br ${fromColor} ${toColor}`}>Play</Button>            
                </div>                                  
            </CardBody>
        </Card>
    )
}