import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import OverviewStatistic from "@/components/ui/text/OverviewStatistic";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { HardDrive } from "lucide-react";
import { formatDateToDayMonthNameYearTime } from "@/lib/string-util";
import { useActiveGame } from "../../active-game-context";

export default function QuickOverview() {
    const { gameMode, timePerTurn, wordLength, totalRounds, createdAt } = useActiveGame();

    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText
                    text="Overview"
                    Icon={HardDrive}
                />

                <div className="flex flex-col gap-2">
                    {timePerTurn && <OverviewStatistic label="Time per Guess:" value={timePerTurn ? `${timePerTurn}s` : `∞`} />}
                    <OverviewStatistic label="Total Rounds" value={totalRounds} />
                    <OverviewStatistic label="Game Mode" value={gameMode} />
                    <OverviewStatistic label="Created" value={formatDateToDayMonthNameYearTime(createdAt)} />
                </div>
            </CardBody>
        </Card>           
    )
}