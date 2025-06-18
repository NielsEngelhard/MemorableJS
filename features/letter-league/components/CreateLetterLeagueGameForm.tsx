"use client";

import { FormProvider, useForm } from "react-hook-form";
import WordLengthInput from "./config/WordLengthInput";
import { CreateLetterLeagueGame, createLetterLeagueGameSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TotalRoundsInput from "./config/TotalRoundsInput";
import MaxAttemptsInput from "./config/MaxAttemptsInput";
import { GameMode } from "@/features/game/constants";
import VisibilityInput from "./config/VisibilityInput";
import TimePerTurnInput from "./config/TimePerTurnInput";

interface Props {
    gameMode: GameMode;
}

export default function CreateLetterLeagueGameForm({ gameMode }: Props) {
        const form = useForm<CreateLetterLeagueGame>({
            resolver: zodResolver(createLetterLeagueGameSchema),
            defaultValues: {
                wordLength: 6,
                timePerTurn: 30,
                totalRounds: 4,
                maxAttemptsPerRound: 6
            }
        })  

    async function onSubmit(data: CreateLetterLeagueGame) {

    }

    return (
        <Card className="w-full">
            <CardBody>
                <FormProvider {...form}>
                    <form className="flex flex-col gap-2 lg:gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <WordLengthInput></WordLengthInput>
                        <TotalRoundsInput></TotalRoundsInput>
                        <MaxAttemptsInput></MaxAttemptsInput>
                        <TimePerTurnInput></TimePerTurnInput>

                        {gameMode == GameMode.Multiplayer && (
                            <VisibilityInput></VisibilityInput>
                        )}
                    </form>            
                </FormProvider>                 
            </CardBody>
        </Card>
    )
}