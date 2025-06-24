import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import OverviewStatistic from "@/components/ui/text/OverviewStatistic";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { HardDrive } from "lucide-react";
import { useLetterLeagueGame } from "../letter-league-game-context";
import { formatDateToDayMonthNameYearTime } from "@/lib/string-util";

export default function QuickOverview() {
    const { gameMode, timePerTurn, wordLength, totalRounds, createdAt } = useLetterLeagueGame();

    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText
                    text="Overview"
                    Icon={HardDrive}
                />

                <div className="flex flex-col gap-2">
                    <OverviewStatistic label="Time per Guess:" value={timePerTurn ? `${timePerTurn}s` : `∞`} />
                    <OverviewStatistic label="Total Rounds" value={totalRounds} />
                    <OverviewStatistic label="Game Mode" value={gameMode} />
                    <OverviewStatistic label="Created" value={formatDateToDayMonthNameYearTime(createdAt)} />
                </div>
            </CardBody>
        </Card>           
    )
}