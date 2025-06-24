"use client";

import { FormProvider, useForm } from "react-hook-form";
import WordLengthInput from "./config/WordLengthInput";
import { CreateLetterLeagueGame, createLetterLeagueGameSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TotalRoundsInput from "./config/TotalRoundsInput";
import MaxAttemptsInput from "./config/MaxAttemptsInput";
import VisibilityInput from "./config/VisibilityInput";
import TimePerTurnInput from "./config/TimePerTurnInput";
import Button from "@/components/ui/Button";
import { Play } from "lucide-react";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { CreateGame } from "../actions";
import { redirect } from 'next/navigation';
import ShowFormErrors from "@/components/ui/form/ShowFormErrors";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { GameMode } from "@/drizzle/schema/enum/game-mode";

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
                maxAttemptsPerRound: 6,
                gameVisibility: GameVisibility.Private,
                gameMode: gameMode
            }
        })  

    async function onSubmit(data: CreateLetterLeagueGame) {
        var response = await CreateGame(data);
        redirect(`/letter-league/play/${response.gameId}`);
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

                        <Button type="submit">
                            <TextWithIcon Icon={Play}>Start Game</TextWithIcon>
                        </Button>
                        <ShowFormErrors errors={form.formState.errors} />
                    </form>            
                </FormProvider>                 
            </CardBody>
        </Card>
    )
}