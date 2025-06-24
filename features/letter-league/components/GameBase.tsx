import Card from "@/components/ui/card/Card";
import GameBoard from "./GameBoard";
import CardBody from "@/components/ui/card/CardBody";
import QuickSettings from "./QuickSettings";
import GuessedLettersOverview from "./GuessedLettersOverview";
import QuickOverview from "./QuickOverview";

interface Props {
}

export default function GameBase({  }: Props) {
    return (
        <div className="w-full flex lg:grid lg:grid-cols-3 flex-col-reverse gap-10">
            <div className="flex flex-col gap-10">
                <GuessedLettersOverview />
                <QuickSettings />                
                <QuickOverview />                 
            </div>
            <Card className="col-span-2 w-full">
                <CardBody className="w-full items-center flex">
                    <GameBoard

                    />                    
                </CardBody>
            </Card>
        </div>
    )
}