import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SubTitleText from "@/components/ui/text/SubTitleText";

interface Props {
    score: number;
}

export default function SinglePlayerScoreTile({score} : Props) {
    return (
        <Card variant="fade">
            <CardBody className="p-2 lg:p-6 items-center text-primary !gap-0">
                <SubTitleText
                    text="Score"
                />   
                <div className="font-bold text-2xl">
                    {score}
                </div>

                <div>
                    points
                </div>
            </CardBody>
        </Card>
    )
}