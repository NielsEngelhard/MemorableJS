"use client";

import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import StatisticCard from "@/components/ui/card/StatisticCard";
import { LetterText, Trophy } from "lucide-react";
import RoundHistory from "./RoundHistory";
import TitleText from "@/components/ui/text/TitleText";
import CardHeader from "@/components/ui/card/CardHeader";
import { GameHistoryModel } from "../models";
import PlayerHistory from "./PlayerHistory";

interface Props {
    gameHistory: GameHistoryModel;
}

export default function PlayedGameOverview({ gameHistory }: Props) {
    const totalRounds = gameHistory.rounds.flatMap(r => r.guesses).length;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Card variant="fade">
                <CardBody>
                    <BasicPageIntro
                        title="GAME OVERVIEW"
                        subText="Not bad. Not bad."
                        Icon={Trophy}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <StatisticCard title={gameHistory.totalScore} text="Total Score" titleColor="primary" />
                        <StatisticCard title={gameHistory.rounds.length} text="Rounds Played" titleColor="success" />
                        <StatisticCard title={totalRounds} text="Total Guesses" titleColor="secondary" />
                    </div>                      
                </CardBody>
            </Card>

            {gameHistory.players.length > 1 && (
                <Card>
                    <CardBody className="flex flex-col gap-2">
                        {gameHistory.players.sort(p => p.score).map((player) => {
                            return <PlayerHistory player={player} />
                        })}                    
                    </CardBody>
                </Card>                
            )}

            <Card>
            <CardBody>
                <CardHeader>
                    <LetterText className="w-6 h-6 text-blue-600" />
                    <TitleText>Rounds</TitleText>
                </CardHeader> 

                <div className="flex flex-col gap-2">
                    {gameHistory.rounds.sort((a, b) => a.index - b.index).map((round, index) => {
                        return <RoundHistory round={round} key={`rh-${index}`} />          
                    })}
                </div>             
            </CardBody>
            </Card>
        </div>
    )
}